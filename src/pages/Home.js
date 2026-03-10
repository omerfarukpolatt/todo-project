import React, { useState } from "react";
import TodoItem from "../components/TodoItem";

function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text === "") return;

    const newTodo = {
      id: Date.now(),
      text: text,
    };

    setTodos([...todos, newTodo]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id) => {
    const newText = prompt("Yeni todo gir:");

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

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

      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>

    </div>
  );
}

export default Home;