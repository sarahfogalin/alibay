import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: "" };
  }

  handleSearch = event => {
    console.log("search: ", event.target.value);
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = () => {
    event.preventDefault();
    let data = new FormData();
    data.append("search", this.state.searchQuery);
    fetch("http://localhost:4000/searchItem", { method: "POST", body: data })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        console.log("*** body: ", body.items);
        this.props.dispatch({ type: "search-results", results: body.items });
        this.props.history.push("/search-results");
      });
  };

  render = () => {
    return (
      <div className="padded">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleSearch}
            className="searchBox searchbar"
          />
          {/* <input type="submit" value="Search" className="button" /> */}
        </form>
      </div>
    );
  };
}

let Search = connect()(UnconnectedSearch);

export default withRouter(Search);
