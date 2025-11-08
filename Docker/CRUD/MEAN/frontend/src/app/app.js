(function () {
  const apiBase = '/api/users';
  let editingId = null;

  function showMessage(msg, isError) {
    const el = document.getElementById('formMessage');
    if (!el) return;
    el.textContent = msg || '';
    el.style.color = isError ? 'crimson' : 'green';
    if (msg) setTimeout(() => (el.textContent = ''), 4000);
  }

  async function fetchUsers() {
    const list = document.getElementById('usersList');
    if (!list) return;
    list.innerHTML = '<p class="muted">Loading...</p>';
    try {
      const res = await fetch(apiBase);
      if (!res.ok) throw new Error('Failed to load users');
      const users = await res.json();
      renderUsers(users);
    } catch (err) {
      list.innerHTML = `<p class="muted">${err.message}</p>`;
    }
  }

  function renderUsers(users) {
    const list = document.getElementById('usersList');
    if (!list) return;
    if (!users || users.length === 0) {
      list.innerHTML = '<p class="muted">No users yet.</p>';
      return;
    }
    const rows = users.map(u => {
      const name = escapeHtml(u.name || '—');
      const email = escapeHtml(u.email || '—');
      return `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.04)">
          <div>
            <div style="font-weight:600">${name}</div>
            <div class="muted" style="font-size:0.9rem">${email}</div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn" data-action="edit" data-id="${u._id}">Edit</button>
            <button class="btn" data-action="delete" data-id="${u._id}">Delete</button>
          </div>
        </div>`;
    }).join('\n');
    list.innerHTML = rows;
  }

  function escapeHtml(s) {
    if (!s) return '';
    return String(s).replace(/[&<>"']/g, function (m) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
    });
  }

  async function submitForm(ev) {
    ev.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) return showMessage('Name and email are required', true);

    const payload = { name, email };
    try {
      let res;
      if (editingId) {
        res = await fetch(`${apiBase}/${editingId}`, {
          method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(apiBase, {
          method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)
        });
      }
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Request failed');
      }
      // reset
      editingId = null;
      document.getElementById('userForm').reset();
      showMessage('Saved');
      fetchUsers();
    } catch (err) {
      showMessage(err.message || 'Error', true);
    }
  }

  function startEdit(id) {
    fetch(`${apiBase}/${id}`).then(r => {
      if (!r.ok) throw new Error('Failed to load');
      return r.json();
    }).then(user => {
      document.getElementById('name').value = user.name || '';
      document.getElementById('email').value = user.email || '';
      editingId = id;
      showMessage('Editing user — submit to save');
    }).catch(err => showMessage('Could not load user', true));
  }

  async function deleteUser(id) {
    if (!confirm('Delete this user?')) return;
    try {
      const res = await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      showMessage('Deleted');
      fetchUsers();
    } catch (err) {
      showMessage(err.message || 'Error', true);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('userForm');
    if (form) form.addEventListener('submit', submitForm);
    const refresh = document.getElementById('refreshBtn');
    if (refresh) refresh.addEventListener('click', fetchUsers);
    const usersList = document.getElementById('usersList');
    if (usersList) {
      usersList.addEventListener('click', function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        if (action === 'edit') startEdit(id);
        if (action === 'delete') deleteUser(id);
      });
    }

    // initial load
    fetchUsers();
  });
})();
