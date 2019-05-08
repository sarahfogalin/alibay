import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";

class UnconnectedSearchResults extends Component {
  render = () => {
    let searchResults = this.props.searchResults;
    return (
      <div className="item">
        console.log("searchResults")
        {searchResults.map(result => {
          return (
            <div>
              <Item path={result.image} itemId={result.id} />
            </div>
          );
        })}
      </div>
    );
  };
}

let SearchResults = connect()(UnconnectedSearchResults);
export default SearchResults;
