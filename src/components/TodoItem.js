import React from "react";

function TodoItem({ todo, deleteTodo, updateTodo, toggleComplete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">

        <div className="d-flex align-items-center">

            <input 
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            className="form-check-input me-3"
            />

            <span style={{
            textDecoration: todo.completed ? "line-through" : "none",
            fontWeight:"500"
            }}>
            {todo.text}
            </span>

        </div>

        <div>

            <button 
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => updateTodo(todo.id)}
            >
            ✏️
            </button>

            <button 
            className="btn btn-outline-danger btn-sm"
            onClick={() => deleteTodo(todo.id)}
            >
            🗑
            </button>

        </div>

    </li>
  );
}

export default TodoItem;