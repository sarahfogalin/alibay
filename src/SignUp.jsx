import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
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
    fetch("http://localhost:4000/signup", {
      method: "POST",
      body: data
    })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        console.log(ResponseBody);
        let body = JSON.parse(ResponseBody);
        if (!body.success) {
          alert("NOPE");
          return;
        }
        this.props.dispatch({ type: "signup-success" });
        return fetch("http://localhost:4000/login", {
          method: "POST",
          body: data,
          credentials: "include"
        })
          .then(res => {
            return res.text();
          })
          .then(ResponseBody => {
            let bodytwo = JSON.parse(ResponseBody);
            if (!bodytwo.success) {
              alert("login failed..");
              return;
            }
            this.props.dispatch({ type: "login-success" });
            this.props.dispatch({
              type: "set-username",
              username: this.state.username
            });
          });
      });
  };

  render = () => {
    return (
      <div className="flex">
        SIGNUP:
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleUsernameChange}
            placeholder="USERNAME"
          />
          <input
            type="text"
            onChange={this.handlePasswordChange}
            placeholder="PASSWORD"
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

let Signup = connect()(UnconnectedSignUp);

export default Signup;
