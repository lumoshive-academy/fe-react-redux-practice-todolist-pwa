// src/components/TodoInput.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../redux/slices/todosSlice";
import { addTodo } from "../redux/slices/todosSlice";
import { v4 as uuidv4 } from "uuid";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { isUpdate, todo, loading } = useSelector((state) => state.todos);

  useEffect(() => {
    if (todo?.id) {
      setText(todo.text);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (isUpdate) {
        dispatch(
          updateTodo({
            ...todo,
            text,
          })
        );
      } else {
        dispatch(
          addTodo({
            id: uuidv4(),
            text,
            completed: false,
          })
        );
      }
      setText("");
    }
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
        <button
          className={`btn ${isUpdate ? "btn-warning" : "btn-primary"}`}
          type="submit"
          disabled={loading}
        >
          {isUpdate ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
