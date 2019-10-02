import React, { Component } from "react";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    };
  }

  componentDidMount() {
    this.props.model.addObserver(this);
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
    return (
      <div className="Sidebar" class="col-md-4">
        <p class="title"><span class="value-num-guests">{this.state.numberOfGuests}</span> Guests</p>
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">People</span>
            </div>
          <input
            type="number"
            class="input-num-guests form-control"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
        </div>
        <table id="dishTable" class="table">
            <thead>
                <tr>
                    <th scope="col">Dish Name</th>
                    <th scope="col">Cost</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <div class="total">
            <b>Total: </b><span>SEK </span><span class="value-total-price"></span>
        </div>
        <button id="confirmDinner" class="btn btn-primary">
            Confirm Dinner
        </button>
      </div>
    );
  }
}

export default Sidebar;
