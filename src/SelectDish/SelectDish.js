import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";

class SelectDish extends Component {
  render() {
    return (
      <div className="SelectDish">
        <div className="row">
            <Sidebar model={this.props.model} />
            <Dishes model={this.props.model} />
        </div>
      </div>
    );
  }
}

export default SelectDish;
