import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AddItem extends Component {
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
  handleItemCategory = event => {
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
    console.log("in handle submit");
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              onChange={this.handleItemName}
              className="box"
              placeholder="ITEM NAME"
            />
          </div>
          <div>
            <textarea
              rows="3"
              onChange={this.handleItemDesc}
              className="big-box"
              placeholder="DESCRIPTION..."
            />
          </div>
          <div>
            <input
              type="number"
              onChange={this.handleItemPrice}
              className="box"
              placeholder="$$$"
            />
          </div>
          <div>
            <input type="file" onChange={this.handleItemImage} />
          </div>
          <div>
            <select
              required
              name="dropdown"
              onChange={this.handleCategoryChange}
              className="box"
            >
              <option value="" selected>
                Choose here
              </option>
              <option value="undefined"> Choose here</option>
              <option value="Clothing">Clothing</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              onChange={this.handleItemStock}
              className="box"
              placeholder="HOW MANY IN STOCK"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={this.handleItemID}
              className="box"
              placeholder="CHOOSE AN ID"
            />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  };
}

export default withRouter(AddItem);
