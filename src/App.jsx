import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./SignUp.jsx";
import Login from "./LogIn.jsx";
import Logout from "./Logout.jsx";
import Item from "./Item.jsx";
import Search from "./Search.jsx";
import SearchResults from "./SearchResults.jsx";
import ItemDetails from "./ItemDetails.jsx";
import AddItem from "./AddItem.jsx";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Modal from "react-modal";
Modal.setAppElement("#root");

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsArray: [],
      display: false,
      loginModalIsOpen: false,
      signupModalIsOpen: false
    };
  }
  componentDidMount = () => {
    this.fetchItems();
    fetch("http://localhost:4000/autoLogin", {
      credentials: "include"
    })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        console.log("***inside the auto login res body: ", ResponseBody);
        let body = JSON.parse(ResponseBody);
        if (body.success) {
          console.log("** dispatch");
          this.props.dispatch({ type: "login-success" });
          this.props.dispatch({
            type: "set-username",
            username: body.username
          });
        }
      });
  };
  fetchItems = () => {
    fetch("http://localhost:4000/allItems", {
      method: "GET"
    })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        this.setState({ itemsArray: body.items });
        console.log("fetched all items", body);
      });
  };

  openLoginModal = () => {
    this.setState({ loginModalIsOpen: true });
  };
  openSignupModal = () => {
    this.setState({ signupModalIsOpen: true });
  };

  closeLoginModal = () => {
    this.setState({ loginModalIsOpen: false });
  };

  closeSignupModal = () => {
    this.setState({ signupModalIsOpen: false });
  };

  renderHomepage = () => {
    console.log(this.state.itemsArray);
    let displayItems = this.state.itemsArray.map(item => {
      return <Item path={item.image} itemId={item.id} />;
    });
    let firstFive = displayItems.slice(0, 5);

    let itemsDisplayed = () => {
      if (!this.state.display) {
        return firstFive;
      }
      return displayItems;
    };

    let setDisplayAll = () => {
      this.setState({ display: true });
    };

    return (
      <div>
        <img src="./catbg2.jpg" className="catpic" />
        <img src="./petlogo.png" className="logo" />
        <div className="flex nav">
          <p className="welcome">Welcome {this.props.username}</p>
          {!this.props.loggedIn && (
            <div className="stayright flex">
              <Search />
              <button onClick={this.openSignupModal} className="button">
                Sign Up
              </button>
              <Modal isOpen={this.state.signupModalIsOpen}>
                <Signup />
                <button onClick={this.closeSignupModal}>close</button>
              </Modal>

              <button onClick={this.openLoginModal} className="button">
                Login
              </button>
              <Modal isOpen={this.state.loginModalIsOpen}>
                <Login />
                <button onClick={this.closeLoginModal}>close</button>
              </Modal>
            </div>
          )}

          {this.props.loggedIn && (
            <div className="flex">
              <div className="stayright flex">
                <Search />
                <div>
                  <Link to="/additem" className="button">
                    Add Item For Sale
                  </Link>
                </div>
                <Logout />
              </div>
            </div>
          )}
        </div>
        <div className="best-items">
          <button onClick={setDisplayAll}>Display All</button>
          <div className="item">{itemsDisplayed()}</div>
        </div>
      </div>
    );
  };

  renderAddItem = () => {
    return <AddItem fetchItems={this.fetchItems} />;
  };

  renderSearchResults = () => {
    return <SearchResults searchResults={this.props.searchResults} />;
  };

  renderItemDetails = routerData => {
    let itemsArray = this.state.itemsArray;
    let itemId = routerData.match.params.id;
    let candidates = itemsArray.filter(item => {
      return item.id === itemId;
    });

    return <ItemDetails item={candidates[0]} />;
  };
  render = () => {
    console.log("state", this.state);
    return (
      <div>
        <Route exact={true} path="/" render={this.renderHomepage} />
        <Route exact={true} path="/item/:id" render={this.renderItemDetails} />
        <Route exact={true} path="/additem" render={this.renderAddItem} />
        <Route
          exact={true}
          path="/search-results"
          render={this.renderSearchResults}
        />
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    searchResults: state.results
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
