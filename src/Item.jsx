import React, { Component } from "react";
import { Link } from "react-router-dom";

class Item extends Component {
  render = () => {
    return (
      <div>
        item
        <img src={"http://localhost:4000/" + this.props.path} />
        <Link to={"/item/" + this.props.itemId}>Details</Link>
      </div>
    );
  };
}

export default Item;
