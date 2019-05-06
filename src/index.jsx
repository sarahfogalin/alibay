import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./main.css";
import { Provider } from "react-redux";
import React, { Component } from "react";
import store from "./store.jsx";
import { Route, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
