import React, { Component } from "react";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemDescription: "",
      itemPrice: 0,
      itemImage: "",
      itemCategory: "",
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
        if (body.success) {
          this.props.fetchItems();
          console.log(body);
        }
      });
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Item Name:
          <input type="text" onChange={this.handleItemName} />
          Item Description:
          <input type="text" onChange={this.handleItemDesc} />
          Price:
          <input type="number" onChange={this.handleItemPrice} />
          Image:
          <input type="file" onChange={this.handleItemImage} />
          <DropdownButton id="dropdown-button" title="Categories">
            <Dropdown.Item as="text">Clothing</Dropdown.Item>
            <Dropdown.Item as="text">Footwear</Dropdown.Item>
            <Dropdown.Item as="text">Accessories</Dropdown.Item>
          </DropdownButton>
          How Many:
          <input type="text" onChange={this.handleItemStock} />
          ID:
          <input type="text" onChange={this.handleItemID} />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default AddItem;
