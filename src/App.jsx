import React, { Component } from "react";
import { connect } from "react-redux";
import Signup from "./SignUp.jsx";
import Login from "./LogIn.jsx";
import Item from "./Item.jsx";
import ItemDetails from "./ItemDetails.jsx";
import AddItem from "./AddItem.jsx";
import { Route, BrowserRouter, Link } from "react-router-dom";

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsArray: []
    };
  }
  componentDidMount = () => {
    this.fetchItems();
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
        this.setState({ itemsArray: body });
        console.log("fetched all items", body);
      });
  };

  renderHomepage = () => {
    let displayItems = this.state.itemsArray.map(item => {
      return <Item path={item.image} itemId={item.id} />;
    });
    return (
      <div>
        <h3>Welcome</h3>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Log in</Link>
        <Link to="/additem">Add item</Link>
        <div className="item">{displayItems}</div>
      </div>
    );
  };
  renderSignup = () => {
    return <Signup />;
  };

  renderLogin = () => {
    return <Login />;
  };

  renderAddItem = () => {
    return <AddItem fetchItems={this.fetchItems} />;
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
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={this.renderHomepage} />
          <Route exact={true} path="/signup" render={this.renderSignup} />
          <Route exact={true} path="/login" render={this.renderLogin} />
          <Route
            exact={true}
            path="/item/:id"
            render={this.renderItemDetails}
          />
          <Route exact={true} path="/additem" render={this.renderAddItem} />
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