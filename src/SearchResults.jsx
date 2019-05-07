import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSearchResults extends Component {
  render = () => {
    let results = this.props.data.filter(item => {
      return item.name.includes(this.props.query);
    });
    return (
      <div>
        {results.map(result => {
          return <div>{result.name}</div>;
        })}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { query: state.searchQuery };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
