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
          <p className="item-name">
            {this.props.name} ${this.props.price}
          </p>
        </Link>
      </div>
    );
  };
}

export default Item;
