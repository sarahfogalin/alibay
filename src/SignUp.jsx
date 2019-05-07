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
        if (body.success) {
          alert("You're all signed up");
        }
      });
  };

  render = () => {
    return (
      <div>
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

let Signup = connect()(UnconnectedSignUp);

export default Signup;
