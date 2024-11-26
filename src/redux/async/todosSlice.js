import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await axios.get(API_URL);
    return response.data;
})

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
    const response = await axios.post(API_URL, todo);
    return response.data;
})

const initialState = {
    todos: [],
    todo: {},
    isUpdate: false,
    loading: false,
    error: null,
    isSuccess: false
}

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch todos
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload;
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        });
        // add todo
        builder.addCase(addTodo.pending, (state) => {
            state.loading = true
            state.isSuccess = false
        });
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;  
        });
        builder.addCase(addTodo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Something went wrong";
        });
    }
})

export default todosSlice.reducer