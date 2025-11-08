import { Component, signal, CommonModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  _id?: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
})
export class App {
  readonly users = signal<User[]>([]);
  readonly name = signal('');
  readonly email = signal('');
  readonly editingId = signal<string | null>(null);
  readonly message = signal('');
  readonly messageColor = signal('crimson');

  private apiBase = '/api/users';

  constructor() {
    // initial load
    this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const res = await fetch(this.apiBase);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      this.users.set(Array.isArray(data) ? data : []);
    } catch (err: any) {
      this.message.set(err?.message || 'Error loading users');
      this.messageColor.set('crimson');
    }
  }

  async submit(ev?: Event) {
    ev?.preventDefault();
    const name = this.name();
    const email = this.email();
    if (!name || !email) {
      this.message.set('Name and email required');
      this.messageColor.set('crimson');
      return;
    }

    const payload = { name, email };
    try {
      let res: Response;
      if (this.editingId()) {
        res = await fetch(`${this.apiBase}/${this.editingId()}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(this.apiBase, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Request failed');
      }
      this.name.set('');
      this.email.set('');
      this.editingId.set(null);
      this.message.set('Saved');
      this.messageColor.set('green');
      this.fetchUsers();
    } catch (err: any) {
      this.message.set(err?.message || 'Error');
      this.messageColor.set('crimson');
    }
  }

  startEdit(user: User) {
    this.name.set(user.name || '');
    this.email.set(user.email || '');
    this.editingId.set(user._id || null);
    this.message.set('Editing user — submit to save');
    this.messageColor.set('black');
  }

  async deleteUser(id?: string) {
    if (!id) return;
    if (!confirm('Delete this user?')) return;
    try {
      const res = await fetch(`${this.apiBase}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      this.message.set('Deleted');
      this.messageColor.set('green');
      this.fetchUsers();
    } catch (err: any) {
      this.message.set(err?.message || 'Error');
      this.messageColor.set('crimson');
    }
  }
}
