import React, { Component } from "react";
// import { Link } from "react-router-dom";

class ItemDetails extends Component {
  render = () => {
    return (
      <ul>
        <img
          src={"http://localhost:4000/images/" + this.props.item.image}
          height="200"
        />
        <li>description: {this.props.item.description}</li>
        <li>price: ${this.props.item.price}</li>
      </ul>
    );
  };
}

export default ItemDetails;
