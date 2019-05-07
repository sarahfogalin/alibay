import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSearch extends Component {
  handleQuery = event => {
    this.props.dispatch({ type: "query", q: event.target.value });
  };
  render = () => {
    return (
      <div>
        Search
        <input
          type="text"
          onChange={this.handleQuery}
          value={this.props.query}
        />
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { query: state.SearchQuery };
};

let Search = connect(mapStateToProps)(UnconnectedSearch);

export default Search;
