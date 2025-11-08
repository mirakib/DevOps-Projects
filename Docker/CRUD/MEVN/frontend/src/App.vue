<template>
  <div class="app-container">
    <p align="center">
      <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=mongo,express,react,nodejs" />
      </a>
    </p>
    <header>
      <h1>User Dashboard</h1>
    </header>

    <main class="content">
      <!-- Form Section -->
      <section class="form-section">
        <h2>{{ editingId ? "Edit User" : "Add User" }}</h2>
        <form @submit.prevent="addUser">
          <div class="form-group">
            <label>Name</label>
            <input v-model="name" placeholder="Enter name" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="email" placeholder="Enter email" required />
          </div>
          <button type="submit" class="btn-primary">
            {{ editingId ? "Update" : "Add" }}
          </button>
          <button v-if="editingId" @click="cancelEdit" type="button" class="btn-secondary">
            Cancel
          </button>
        </form>
      </section>

      <!-- User List Section -->
      <section class="list-section">
        <h2>Registered Users</h2>
        <ul>
          <li v-for="user in users" :key="user._id">
            <div class="user-card">
              <div class="user-info">
                <strong>{{ user.name }}</strong><br />
                <small>{{ user.email }}</small>
              </div>
              <div class="actions">
                <button class="btn-edit" @click="editUser(user)">✏️</button>
                <button class="btn-delete" @click="deleteUser(user._id)">🗑️</button>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </main>

    <footer>
      <p>Developed by <strong>Moshrekul Islam</strong> | © 2025</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const name = ref('')
const email = ref('')
const editingId = ref(null)

const API_URL = '/api/users'

async function fetchUsers() {
  const res = await fetch(API_URL)
  users.value = await res.json()
}

async function addUser() {
  const method = editingId.value ? 'PUT' : 'POST'
  const url = editingId.value ? `${API_URL}/${editingId.value}` : API_URL

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.value, email: email.value })
  })

  name.value = ''
  email.value = ''
  editingId.value = null
  fetchUsers()
}

function editUser(user) {
  name.value = user.name
  email.value = user.email
  editingId.value = user._id
}

function cancelEdit() {
  name.value = ''
  email.value = ''
  editingId.value = null
}

async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  fetchUsers()
}

onMounted(fetchUsers)
</script>

<style>
body {
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f5f6fa;
  color: #333;
  margin: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  text-align: center;
  background: #4a90e2;
  color: #fff;
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px;
  gap: 40px;
}

/* Form Section */
.form-section {
  background: #ffffff;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  width: 35%;
  min-width: 300px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #357ab8;
}

.btn-secondary {
  background: #999;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.btn-secondary:hover {
  background: #777;
}

/* List Section */
.list-section {
  background: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
}

.user-info strong {
  color: #333;
}

.actions button {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
}

.btn-edit:hover {
  color: #4a90e2;
}

.btn-delete:hover {
  color: #e74c3c;
}

footer {
  text-align: center;
  background: #222;
  color: #fff;
  padding: 12px;
  font-size: 14px;
}
</style>