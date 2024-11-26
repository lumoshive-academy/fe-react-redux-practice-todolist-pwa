import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
const initialState = {
  count: 0,
};
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state.count + 1;
    case "DECREMENT":
      return state.count - 1;
    default:
      return state;
  }
};
// middleware
const logger = (store) => (next) => (action) => {
  console.log("Action:", action);
  next(action);
  console.log("State sekarang:", store.getState());
};
// store
const store = createStore(counterReducer, applyMiddleware(logger));
// subscribe
// store.subscribe(() => {
//   console.log("State sekarang:", store.getState());
// });

// dispatch
store.dispatch({ type: "INCREMENT" });
// console.log(store.getState()); // Output: 1
