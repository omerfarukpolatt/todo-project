import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";

function Home() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (text === "") return;

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id) => {
    const newText = prompt("Yeni todo gir:");
    if (!newText) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Görev sayısı
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
  <div>

    <div 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}
    >
      <h1 style={{fontSize:"48px", fontWeight:"bold"}}>Todo App</h1>
    </div>

    <div className="container mt-4">

      <div className="card shadow p-4">

        <div className="input-group mb-3">
          <input
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Todo yaz..."
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Ekle
          </button>
        </div>

        <div className="btn-group mb-3">
            <button 
                className={`btn ${filter === "all" ? "btn-success" : "btn-outline-success"}`}
                onClick={() => setFilter("all")}
            >
                Today
            </button>

            <button 
                className={`btn ${filter === "pending" ? "btn-warning" : "btn-outline-warning"}`}
                onClick={() => setFilter("pending")}
            >
                Pending
            </button>

            <button 
                className={`btn ${filter === "completed" ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={() => setFilter("completed")}
            >
                Completed
            </button>
        </div>

        <ul className="list-group mb-2">
          {todos
            .filter(todo =>
              filter === "all" ? true :
              filter === "completed" ? todo.completed : !todo.completed
            )
            .map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                toggleComplete={toggleComplete}
              />
            ))
          }
        </ul>
            <div className="mt-3 text-muted">
            <b>Total:</b> {total} | 
            <b> Completed:</b> {completed} | 
            <b> Pending:</b> {pending}
            </div>
      </div>
    </div>
  </div>
);
}

export default Home;