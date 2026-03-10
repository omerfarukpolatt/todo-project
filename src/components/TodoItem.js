import React from "react";

function TodoItem({ todo, deleteTodo, updateTodo, toggleComplete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">

      {/* Checkbox ve text */}
      <div>
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => toggleComplete(todo.id)} 
          className="me-2"
        />
        <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
          {todo.text}
        </span>
      </div>

      {/* Butonlar */}
      <div>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => updateTodo(todo.id)}
        >
          Güncelle
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteTodo(todo.id)}
        >
          Sil
        </button>
      </div>
    </li>
  );
}

export default TodoItem;