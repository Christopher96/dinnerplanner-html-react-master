import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import "./DishDetails.css";

class DishDetails extends Component {
  render() {
    return (
      <div className="DishDetails">
        <div className="row">
            <Sidebar model={this.props.model} />
            <div id="dishInformation" className="col-md-4">
                <p className="title"></p>
                <img src="#" alt="" />
                <p className="title">Instructions</p>
                <p className="instructions"></p>
                <Link to="/search" className="btn btn-primary">Back to search</Link>
            </div>
            <div className="col-md-5">
                <span className="title">Ingredients for <span className="people"></span> people</span>
                <table id="ingredientTable" className="table">
                    <tbody>
                    </tbody>
                </table>
                <hr/>
                <button id="menuAdd" className="btn btn-primary">Add to menu</button>
                <span className="added"> Added &#10004;</span>
                <span className="total">Sek 77.20</span>
            </div>
        </div>
      </div>
    );
  }
}

export default DishDetails;
