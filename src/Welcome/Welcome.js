import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <div id="startTxt">
          <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</span>
          <Link to="/search" className="btn btn-primary">Create new dinner</Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
