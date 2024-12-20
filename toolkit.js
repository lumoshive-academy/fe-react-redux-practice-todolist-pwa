import { configureStore, createSlice } from "@reduxjs/toolkit";
const initialState = {
    count: 0,
};
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => { // penganti action
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
    }
})
// middleware
const logger = (store) => (next) => (action) => {
  console.log("Action:", action);
  next(action);
  console.log("State sekarang:", store.getState());
};

// store
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    },
    middleware: (getDafaultMiddleware) => getDafaultMiddleware().concat(logger),
})

store.subscribe(() => {
    // console.log("State sekarang:", store.getState());
})

store.dispatch(counterSlice.actions.increment())
store.dispatch(counterSlice.actions.increment());
store.dispatch(counterSlice.actions.decrement());