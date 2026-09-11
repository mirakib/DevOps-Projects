import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.API_PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users"
    });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required"
      });
    }

    const user = await User.create({
      name,
      email
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create user"
    });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update user"
    });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json({
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete user"
    });
  }
});

async function startServer() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing");
    }

    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();