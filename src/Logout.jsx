import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogout extends Component {
  handleLogout = () => {
    console.log("logging out...");
    this.props.dispatch({ type: "logout" });
  };
  render = () => {
    return (
      <div>
        <button onClick={this.handleLogout}>LOGOUT</button>
      </div>
    );
  };
}

let Logout = connect()(UnconnectedLogout);
export default Logout;
