import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/users')
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required')
      return
    }

    try {
      const payload = { name: name.trim(), email: email.trim() }
      let res
      if (editingId) {
        res = await fetch(`/api/users/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Request failed: ${res.status}`)
      }

      // reset and refresh
      setName('')
      setEmail('')
      setEditingId(null)
      await fetchUsers()
    } catch (err) {
      setError(err.message)
    }
  }

  function startEdit(user) {
    setEditingId(user._id || user.id)
    setName(user.name || '')
    setEmail(user.email || '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id) {
    if (!confirm('Delete this user?')) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
      await fetchUsers()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app-root">
      <header>
        <h1>MERN CRUD</h1>
      </header>

      <main>
        <section className="form-card">
          <h2>{editingId ? 'Edit user' : 'Add user'}</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
              Email
              <input value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <div className="form-actions">
              <button type="submit" className="btn primary">{editingId ? 'Update' : 'Add'}</button>
              {editingId && (
                <button type="button" className="btn" onClick={() => { setEditingId(null); setName(''); setEmail('') }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="list-card">
          <h2>Users</h2>
          {loading ? (
            <p>Loading...</p>
          ) : users.length === 0 ? (
            <p>No users yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id || u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td className="actions">
                      <button className="btn" onClick={() => startEdit(u)}>Edit</button>
                      <button className="btn danger" onClick={() => handleDelete(u._id || u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>

      <footer>
        <small>Created by Moshrekul Islam</small>
      </footer>
    </div>
  )
}

export default App
