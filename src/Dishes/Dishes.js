import React, { Component } from "react";
import Loader from "../Loader/Loader";
import "./Dishes.css";

class Dishes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "IDLE"
    };
  }

  getDishes = () => {
    this.props.model
      .getAllDishes()
      .then(dishes => {
        console.log(dishes);
        return;
        this.setState({
          dishes,
          status: "LOADED"
        });
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          status: "ERROR"
        });
      });

    this.setState({
      status: "LOADING"
    });
  }

  render() {
    let dishesList = null;

    switch (this.state.status) {
      case "LOADING":
        dishesList = <Loader />;
        break;
      case "LOADED":
        dishesList = this.state.dishes.map(dish => (
          <li key={dish.id}>{dish.title}</li>
        ));
        break;
      case "ERROR":
        dishesList = <b>Unable to retrieve dishes...</b>;
        break;
      default:
        break;
    }

    return (
      <div className="Dishes col-md-9">
        <p className="title">FIND A DISH</p>
        <div className="input-group">
          <input id="dishQuery" className="form-control" type="text" />
          <select id="dishType" className="form-control custom-select">
            <option value="">Choose...</option>
            <option value="starter">Starter</option>
            <option value="main dish">Main dish</option>
            <option value="dessert">Dessert</option>
          </select>
          <div className="input-group-append">
            <button onClick={this.getDishes} className="btn btn-primary">Search</button>
          </div>
        </div>
        <div id="dish-list">
          {dishesList}
        </div>
      </div>
    );
  }
}

export default Dishes;
