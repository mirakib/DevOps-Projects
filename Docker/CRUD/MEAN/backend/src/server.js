'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable mongoose debug to log queries (helpful for troubleshooting)
mongoose.set('debug', true);

// Environment
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:rootpassword@db:27017/appdb?authSource=admin';

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Connect to MongoDB with retry logic
async function connectWithRetry(retries = 5, interval = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      console.log('MONGO_URI:', MONGO_URI);
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed: ${err.message}`);
      console.error(err);
      await new Promise(r => setTimeout(r, interval));
    }
  }
  console.error('Could not connect to MongoDB after retries');
  // do not exit here so the container stays up for debugging; expose dbstate endpoint
}
connectWithRetry().catch(console.error);

// Routes - base path: /api/users
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Debug route: shows mongoose connection state and the configured URI
app.get('/api/dbstate', (req, res) => {
  try {
    const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
    res.json({ readyState: state, uri: MONGO_URI });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  console.log('POST /api/users body:', req.body);
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email required' });
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('POST /api/users error:', err && err.stack ? err.stack : err);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message, name: err.name });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  console.log('PUT /api/users/:id', req.params.id, 'body:', req.body);
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (err) {
    console.error('PUT /api/users/:id error:', err && err.stack ? err.stack : err);
    res.status(500).json({ error: err.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  console.log('DELETE /api/users/:id', req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/users/:id error:', err && err.stack ? err.stack : err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
