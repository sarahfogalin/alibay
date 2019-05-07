import React, { Component } from "react";
import { Link } from "react-router-dom";

class Item extends Component {
  render = () => {
    return (
      <div>
        <img
          src={"http://localhost:4000/images/" + this.props.path}
          height="100"
        />
        <Link to={"/item/" + this.props.itemId}>Details</Link>
      </div>
    );
  };
}

export default Item;
