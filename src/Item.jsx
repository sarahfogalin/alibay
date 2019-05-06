import React, { Component } from "react";

class Item extends Component {
  render = () => {
    return <img src={this.props.path} />;
  };
}

export default Item;
