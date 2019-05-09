import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";
import SearchResults from "./SearchResults.jsx";
import ItemDetails from "./ItemDetails.jsx";
import Header from "./Header.jsx";
import { Route, withRouter } from "react-router-dom";

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
      return (
        <Item
          path={item.image}
          itemId={item.id}
          name={item.name}
          price={item.price}
        />
      );
    });
    let firstFour = displayItems.slice(0, 4);

    let itemsDisplayed = () => {
      if (!this.state.display) {
        return firstFour;
      }
      return displayItems;
    };

    let displayToggle = () => {
      this.setState({ display: !this.state.display });
    };

    return (
      <div>
        <div className="items-displayed">{itemsDisplayed()}</div>
        <div className="justify-center">
          <button onClick={displayToggle} className="see-more-button">
            {this.state.display ? "SEE LESS" : "SEE MORE"}
          </button>
        </div>
      </div>
    );
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
      <div id="app">
        <Header username={this.props.username} loggedIn={this.props.loggedIn} />
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
export default withRouter(App);
