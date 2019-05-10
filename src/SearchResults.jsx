import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";

class UnconnectedSearchResults extends Component {
  render = () => {
    let searchResults = this.props.searchResults;
    return (
      <div className="items-displayed">
        {searchResults.map(result => {
          return (
            <Item
              path={result.image}
              itemId={result.id}
              name={result.name}
              price={result.price}
            />
          );
        })}
      </div>
    );
  };
}

let SearchResults = connect()(UnconnectedSearchResults);
export default SearchResults;
