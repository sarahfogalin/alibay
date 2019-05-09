import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UnconnectedLogout extends Component {
  handleLogout = event => {
    event.stopPropagation();
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
          this.props.history.push("/");
        }
      });
  };
  render = () => {
    return (
      <div>
        <button onClick={this.handleLogout} className="button">
          Log Out
        </button>
      </div>
    );
  };
}

let Logout = connect()(UnconnectedLogout);
export default withRouter(Logout);
