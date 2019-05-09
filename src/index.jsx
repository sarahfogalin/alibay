import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./main.css";
import { Provider } from "react-redux";
import React, { Component } from "react";
import store from "./store.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import "./modal.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
