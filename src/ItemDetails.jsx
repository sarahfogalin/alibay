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
      <ul>
        <img
          src={"http://localhost:4000/images/" + this.props.item.image}
          height="200"
        />
        <li>description: {this.props.item.description}</li>
        <li>price: ${this.props.item.price}</li>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_18GnVPYwKXom1VEc1NhhvGNC00AF7EI0GC"
        />
      </ul>
    );
  }
}

export default ItemDetails;
