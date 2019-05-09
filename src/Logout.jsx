import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogout extends Component {
  handleLogout = () => {
    console.log("logging out...");
    fetch("http://localhost:4000/logout", { credentials: "include" })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        console.log("RES BOD: ", ResponseBody);
        let body = JSON.parse(ResponseBody);
        if (body.success) {
          this.props.dispatch({ type: "logout" });
        }
      });
  };
  render = () => {
    return (
      <div>
        <button onClick={this.handleLogout} className="button">
          LOGOUT
        </button>
      </div>
    );
  };
}

let Logout = connect()(UnconnectedLogout);
export default Logout;
