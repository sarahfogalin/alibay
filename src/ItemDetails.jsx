import React, { Component } from "react";
// import { Link } from "react-router-dom";

class ItemDetails extends Component {
  render = () => {
    return <div>description: {this.props.item.description}</div>;
  };
}

export default ItemDetails;
