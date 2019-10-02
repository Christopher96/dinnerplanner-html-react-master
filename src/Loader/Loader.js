import React, { Component } from "react";
import "./Loader.css";

class Loader extends Component {
  render() {

    return (
      <div id="loader">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Loader;
