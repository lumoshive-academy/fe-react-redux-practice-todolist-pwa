import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  currentTodo,
  deleteTodo,
  toggleTodo,
} from "../redux/slices/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-secondary" : ""
          }`}
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={(e) => dispatch(currentTodo(todo), e.stopPropagation())}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) =>
                dispatch(deleteTodo(todo.id), e.stopPropagation())
              }
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
