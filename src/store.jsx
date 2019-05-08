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
  if (action.type === "logout") {
    return { ...state, loggedIn: false, username: "anonymous" };
  }
  if (action.type === "search-results") {
    return { ...state, results: action.results };
  }
  return state;
};

const store = createStore(
  reducer,
  { loggedIn: false, username: "anonymous", results: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
