import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Signup from "./SignUp.jsx";
import Login from "./LogIn.jsx";
import Logout from "./Logout.jsx";
import Search from "./Search.jsx";
import AddItem from "./AddItem.jsx";
Modal.setAppElement("#root");

class UnconnectedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalIsOpen: false,
      signupModalIsOpen: false,
      itemModalIsOpen: false
    };
  }
  openLoginModal = () => {
    this.props.dispatch({ type: "triggerOpenLoginModal", payload: true });
  };
  openSignupModal = () => {
    this.props.dispatch({ type: "triggerOpenSignupModal", payload: true });
  };

  closeLoginModal = () => {
    this.props.dispatch({ type: "triggerCloseLoginModal", payload: false });
  };

  closeSignupModal = () => {
    this.props.dispatch({ type: "triggerCloseSignupModal", payload: false });
  };

  openItemModal = () => {
    this.setState({ itemModalIsOpen: true });
  };

  closeItemModal = () => {
    this.setState({ itemModalIsOpen: false });
  };

  goHome = () => {
    console.log("****going home...");
    this.props.history.push("/");
  };

  render = () => {
    return (
      <div>
        <img src="./catbg2.jpg" className="catpic" />
        <img src="./petlogo.png" className="logo" onClick={this.goHome} />
        <div className="flex nav">
          <p className="welcome">Welcome {this.props.username}</p>
          {!this.props.loggedIn && (
            <div className="stayright flex">
              <Search />
              <button onClick={this.openSignupModal} className="button">
                Sign Up
              </button>
              <Modal className="Modal" isOpen={this.props.signupModalIsOpen}>
                <div class="modal-header">
                  <span className="close" onClick={this.closeSignupModal}>
                    &times;
                  </span>
                </div>
                <div class="modal-body">
                  <Signup />
                </div>
                <div class="modal-footer" />
              </Modal>

              <button className="button" onClick={this.openLoginModal}>
                Login
              </button>
              <Modal className="Modal" isOpen={this.props.loginModalIsOpen}>
                <div class="modal-header">
                  <span className="close" onClick={this.closeLoginModal}>
                    &times;
                  </span>
                </div>
                <div class="modal-body">
                  <Login />
                </div>
                <div class="modal-footer" />
              </Modal>
            </div>
          )}

          {this.props.loggedIn && (
            <div className="flex">
              <div>
                <button className="button" onClick={this.openItemModal}>
                  Add Item For Sale
                </button>
                <Modal
                  className="itemModal"
                  isOpen={this.state.itemModalIsOpen}
                >
                  <div class="modal-header">
                    <span className="close" onClick={this.closeItemModal}>
                      &times;
                    </span>
                  </div>
                  <div class="itemModal-body">
                    <AddItem />
                  </div>
                  <div class="modal-footer" />
                </Modal>
              </div>

              <div className="logout">
                <div className="stayright flex">
                  <Search />
                  <Logout />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    loginModalIsOpen: state.loginModalIsOpen,
    signupModalIsOpen: state.signupModalIsOpen
  };
};

let Header = connect(mapStateToProps)(UnconnectedHeader);
export default withRouter(Header);
