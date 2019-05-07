import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "signup-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "query") {
    return { ...state, searchQuery: action.q };
  }
  if (action.type === "set-username") {
    return { ...state, username: action.username };
  }
  return state;
};

const store = createStore(
  reducer,
  { loggedIn: false, searchQuery: "", username: "anonymous" },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
