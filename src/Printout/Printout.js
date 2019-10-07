import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Printout.css";

class Printout extends Component {
  constructor(props) {
    super(props);

    this.state = {
        numberOfGuests: this.props.model.getNumberOfGuests(),
        menu: this.props.model.getFullMenu()
    };
  }

  render() {
    let dishList = this.state.menu.map(dish => (
      <div class="row">
        <div class="col-md-3">
          <img src={dish.image} alt="" />
        </div>
        <div class="col-md-5">
          <p class="title">{dish.title}</p>
          <span class="information">{dish.instructions}</span>
        </div>
        <div class="col-md-4">
          <p class="title">Preparation</p>
          <span>Lorem laborum cupiditate odio deserunt natus. Ipsam ipsum numquam repudiandae dolorum maiores nam Fugiat beatae obcaecati voluptates recusandae harum? Unde quod nisi reiciendis veniam saepe. Temporibus repellendus quod porro deleniti</span>
        </div>
      </div>
    ));
    return (
      <div className="Printout">
        <div id="overviewHeader">
          <span className="title">My Dinner: {this.state.numberOfGuests} People</span>
          <Link to="/search" className="btn btn-primary">Go back and edit dinner</Link>
        </div>
        <hr/>
        {dishList}
      </div>
    );
  }
}

export default Printout;
