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
      itemStock: 0
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
  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("itemName", this.state.itemName);
    data.append("itemDescription", this.state.itemDescription);
    data.append("itemPrice", this.state.itemPrice);
    data.append("itemImage", this.state.itemImage);
    data.append("itemCategory", this.state.itemCategory);
    data.append("itemStock", this.state.itemStock);
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
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default AddItem;
