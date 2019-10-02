import React, { Component } from "react";
import "./DishDetails.css";

class DishDetails extends Component {
  render() {
    return (
      <div className="SelectDish">
        <h2>Dish details {this.props.id}</h2>
      </div>
    );
  }
}

export default DishDetails;
