import React from "react";

function TodoItem({ todo, deleteTodo, updateTodo }) {
  return (
    <li className="list-group-item d-flex justify-content-between">
      {todo.text}

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