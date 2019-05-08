import React, { Component } from "react";
// import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

class ItemDetails extends Component {
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`Thank you for your purchase, ${initialSellers.name}`);
      });
    });
  };

  render() {
    return (
      <div className="item-details">
        <img
          className="details-pic"
          src={"http://localhost:4000/images/" + this.props.item.image}
        />
        <div className="list-details">
          <h3>{this.props.item.name}</h3>

          <ul>
            <li>Price: ${this.props.item.price}</li>
            <li>
              {this.props.item.stock} left in stock from{" "}
              {this.props.item.seller}
            </li>
          </ul>
          <p>{this.props.item.description}</p>
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_test_18GnVPYwKXom1VEc1NhhvGNC00AF7EI0GC"
          />
        </div>
      </div>
    );
  }
}

export default ItemDetails;
