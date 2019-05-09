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
    return { ...state, loggedIn: false, username: "" };
  }
  if (action.type === "search-results") {
    return { ...state, results: action.results };
  }
  if (action.type === "triggerOpenLoginModal") {
    return { ...state, loginModalIsOpen: action.payload };
  }
  if (action.type === "triggerOpenSignupModal") {
    return { ...state, signupModalIsOpen: action.payload };
  }
  if (action.type === "triggerCloseLoginModal") {
    return { ...state, loginModalIsOpen: action.payload };
  }
  if (action.type === "triggerCloseSignupModal") {
    return { ...state, signupModalIsOpen: action.payload };
  }
  return state;
};

const store = createStore(
  reducer,
  {
    loggedIn: false,
    username: "",
    results: [],
    loginModalIsOpen: false,
    signupModalIsOpen: false,
    itemModalIsOpen: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
