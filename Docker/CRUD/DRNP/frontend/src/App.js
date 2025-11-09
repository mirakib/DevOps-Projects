import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });

  // Load todos on mount and set page title
  useEffect(() => {
    document.title = "To Do App";
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://192.168.178.133:8000/api/todos/");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://192.168.178.133:8000/api/todos/", {
        title: formData.title,
        description: formData.description,
        completed: false,
      });
      setFormData({ title: "", description: "" });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`http://192.168.178.133:8000/api/todos/${todo.id}/`, {
        ...todo,
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://192.168.178.133:8000/api/todos/${id}/`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero">
          <p align="center">
            <a href="https://skillicons.dev">
              <img src="https://skillicons.dev/icons?i=django,react,python,nginx,docker" />
            </a>
          </p>
          <h1>To Do App</h1>
          <p className="small">A simple Django + React todo example</p>
        </div>
      </header>

      <main className="main-grid">
        <section className="card form-card">
          <h2 className="small">Add a task</h2>
          <form className="todo-form" onSubmit={addTodo}>
            <input
              className="input input-flex"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <input
              className="input input-flex"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <div className="form-actions">
              <button className="btn btn-neutral" type="submit">Add</button>
            </div>
          </form>
        </section>

        <section className="card list-card">
          <h2 className="small">To‑Do List</h2>
          <div className="todo-list">
            {todos.length === 0 && <div className="muted">No todos yet</div>}
            {todos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                <div className="todo-main">
                  <div className="todo-title">{todo.title}</div>
                  <div className="todo-desc">{todo.description}</div>
                </div>

                <div className="todo-actions">
                  <button className="btn btn-neutral" onClick={() => toggleComplete(todo)}>
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button className="btn btn-neutral" onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="app-footer">
        <div className="card footer-card">
          <div className="small muted">Author: MOSHREKUL ISLAM</div>
        </div>
      </footer>
    </div>
  );
}

export default App;

