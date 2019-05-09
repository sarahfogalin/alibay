import React, { Component } from "react";
import { Link } from "react-router-dom";

class Item extends Component {
  render = () => {
    return (
      <div className="item-box">
        <div className="image-container">
          <img
            className="image"
            src={"http://localhost:4000/images/" + this.props.path}
          />
        </div>
        <Link className="item-link" to={"/item/" + this.props.itemId}>
          {this.props.name} ${this.props.price}
        </Link>
      </div>
    );
  };
}

export default Item;
