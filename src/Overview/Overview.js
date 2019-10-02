import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Dish from "../Dish/Dish";
import "./Overview.css";

class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    };
  }

  render() {
    let dishList = this.props.model.getFullMenu().map(dish => (
      <Dish expanded={false} dish={dish} />
    ));
    return (
      <div className="Overview">
        <div id="overviewHeader">
          <span class="title">My Dinner: {this.state.numberOfGuests} People</span>
          <Link to="/search" className="btn btn-primary">Go back and edit dinner</Link>
        </div>
        <hr/>
        <div id="overviewDishes">
          <div class="total">
            {dishList}
            <span>
              <b>Total: </b>SEK <span class="value-total-price"></span>
            </span>
          </div>
        </div>
        <hr/>
        <div id="overviewPrint">
          <Link to="/printout" id="toPrintBtn" class="btn btn-primary">
            Print Full Recipe
          </Link>
        </div>
      </div>
    );
  }
}

export default Overview;
