import React, { Component } from "react";
import { Link } from "react-router-dom";

class Item extends Component {
  render = () => {
    return (
      <div className="item-box">
        <img
          src={"http://localhost:4000/images/" + this.props.path}
          height="150"
        />
        <div>
          <Link to={"/item/" + this.props.itemId}>Details</Link>
        </div>
      </div>
    );
  };
}

export default Item;
