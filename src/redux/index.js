import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todosSlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    }
});
