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
    <div className="container mt-5">
      <h2>Todo App</h2>

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

      <div className="mb-3">
        <button className="btn btn-secondary me-2" onClick={() => setFilter("all")}>Tümü</button>
        <button className="btn btn-success me-2" onClick={() => setFilter("completed")}>Tamamlanan</button>
        <button className="btn btn-warning" onClick={() => setFilter("pending")}>Bekleyen</button>
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

      <p>Toplam: {total} | Tamamlanan: {completed} | Bekleyen: {pending}</p>
    </div>
  );
}

export default Home;