import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";

class UnconnectedAddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemDescription: "",
      itemPrice: 0,
      itemImage: "",
      itemCategory: undefined,
      itemStock: 0,
      itemID: ""
    };
  }

  handleItemName = event => {
    console.log(event.target.value);
    this.setState({ itemName: event.target.value });
  };

  handleItemDesc = event => {
    console.log(event.target.value);
    this.setState({ itemDescription: event.target.value });
  };

  handleItemPrice = event => {
    console.log(event.target.value);
    this.setState({ itemPrice: event.target.value });
  };
  handleItemImage = event => {
    console.log(event.target.files);
    this.setState({ itemImage: event.target.files[0] });
  };
  handleCategoryChange = event => {
    console.log(event.target.value);
    this.setState({ itemCategory: event.target.value });
  };
  handleItemStock = event => {
    console.log(event.target.value);
    this.setState({ itemStock: event.target.value });
  };

  handleItemID = event => {
    console.log(event.target.value);
    this.setState({ itemID: event.target.value });
  };
  handleSubmit = event => {
    this.props.dispatch({
      type: "triggerCloseItemModal",
      payload: false
    });
    console.log("in handle submit", "state.triggerCloseItemModal");
    event.preventDefault();
    let data = new FormData();
    data.append("name", this.state.itemName);
    data.append("description", this.state.itemDescription);
    data.append("price", this.state.itemPrice);
    data.append("item-image", this.state.itemImage);
    data.append("category", this.state.itemCategory);
    data.append("stock", this.state.itemStock);
    data.append("itemId", this.state.itemID);
    fetch("http://localhost:4000/sellItems", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        console.log(body);
        if (body.success) {
          this.props.fetchItems();
          console.log(body);
          this.props.history.push("/");
        }
      });
  };

  render = () => {
    console.log("this the option we want ", this.state.itemCategory);
    return (
      <div className="login">
        <h2 class="logintitle">Sell an item</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              onChange={this.handleItemName}
              className="itemForm"
              placeholder="ITEM NAME"
            />
          </div>
          <div>
            <textarea
              rows="3"
              cols="39"
              onChange={this.handleItemDesc}
              className="big-box"
              placeholder="DESCRIPTION..."
            />
          </div>
          <div className="choose-image">
            <input type="file" onChange={this.handleItemImage} />
          </div>
          <div className="modal-menu">
            <input
              type="number"
              onChange={this.handleItemPrice}
              className="stock"
              placeholder="PRICE"
            />
            <select
              required
              name="dropdown"
              onChange={this.handleCategoryChange}
              className="stock"
            >
              <option value="" selected disabled>
                CATEGORY
              </option>
              <option value="Clothing">Clothing</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
            <input
              type="number"
              onChange={this.handleItemStock}
              className="stock"
              placeholder="STOCK"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={this.handleItemID}
              className="itemId"
              placeholder="ID (unique to your item)"
            />
          </div>
          <div>
            <input type="submit" className="itemSubmit" value="Sell My Item" />
          </div>
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { itemModalIsOpen: state.itemModalIsOpen };
};
let AddItem = connect(mapStateToProps)(UnconnectedAddItem);
export default AddItem;
