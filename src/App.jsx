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
import "./main.css";

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsArray: [],
      display: false
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
        <div>
          <nav>
            <h3>Welcome {this.props.username}</h3>
            {!this.props.loggedIn && (
              <div>
                <h4>Signup</h4>
                <Signup />
                <h4>Log In</h4>
                <Login />
              </div>
            )}
            {this.props.loggedIn && (
              <div>
                <Logout />
                <Link to="/additem">Add item</Link>
              </div>
            )}
          </nav>
        </div>

        <Search />
        <button onClick={setDisplayAll}>Display All</button>
        <div className="item">{itemsDisplayed()}</div>
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
