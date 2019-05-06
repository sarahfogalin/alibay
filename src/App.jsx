import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./SignUp.jsx";
import Login from "./LogIn.jsx";
import { Route, BrowserRouter, Link } from "react-router-dom";

let renderHomepage = () => {
  return (
    <div>
      <h3>Welcome</h3>
      <Link to="/signup">Sign up</Link>
      <Link to="/login">Log in</Link>
      <p>Items will go here</p>
    </div>
  );
};

let fetchItems = () => {
  fetch("http://localhost:4000/allItems", {
    method: "GET"
  })
    .then(response => {
      return response.text();
    })
    .then(ReponseBody => {
      let body = JSON.parse(ResponseBody);
      let itemsArray = body.map(item => {
        return <Item path={item.image} />;
      });
    });
};

let renderSignup = () => {
  return <Signup />;
};

let renderLogin = () => {
  return <Login />;
};

class UnconnectedApp extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderHomepage} />
          <Route exact={true} path="/signup" render={renderSignup} />
          <Route exact={true} path="/login" render={renderLogin} />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  return {};
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
