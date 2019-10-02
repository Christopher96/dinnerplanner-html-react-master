import React, { Component } from "react";
import { Link } from 'react-router-dom';
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
      <div className="Sidebar col-md-3">
        <p className="title"><span className="value-num-guests">{this.state.numberOfGuests}</span> Guests</p>
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">People</span>
            </div>
          <input
            type="number"
            className="input-num-guests form-control"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
        </div>
        <table id="dishTable" className="table">
            <thead>
                <tr>
                    <th scope="col">Dish Name</th>
                    <th scope="col">Cost</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <div className="total">
            <b>Total: </b><span>SEK </span><span className="value-total-price"></span>
        </div>
        <Link to="/overview" className="btn btn-primary">
            Confirm Dinner
        </Link>
      </div>
    );
  }
}

export default Sidebar;
