<template>
  <div class="container">
    <h1>User Manager</h1>
    <form @submit.prevent="addUser">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" placeholder="Email" required />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="user in users" :key="user._id">
        {{ user.name }} ({{ user.email }})
        <button @click="editUser(user)">Edit</button>
        <button @click="deleteUser(user._id)">Delete</button>
      </li>
    </ul>
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

async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  fetchUsers()
}

onMounted(fetchUsers)
</script>

<style>
.container {
  width: 400px;
  margin: 80px auto;
  text-align: center;
}
input {
  margin: 5px;
  padding: 8px;
  width: 80%;
}
button {
  margin: 5px;
  padding: 8px 12px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
