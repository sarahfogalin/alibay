import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "bob",
      password: "",
      modalIsOpen: false
    };
  }

  handleUsernameChange = event => {
    console.log("new username: ", event.target.value);
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("new password: ", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("*** inside the handlesubmit method");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        console.log("res.body from login: ", ResponseBody);
        let body = JSON.parse(ResponseBody);
        if (!body.success) {
          alert("login failed");
          return;
        }
        this.props.dispatch({ type: "login-success" });
        this.props.dispatch({
          type: "set-username",
          username: this.state.username
        });
      });
  };

  render = () => {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          username:
          <input type="text" onChange={this.handleUsernameChange} />
          password:
          <input type="text" onChange={this.handlePasswordChange} />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { username: state.username };
};

let Login = connect(mapStateToProps)(UnconnectedLogin);

export default Login;
