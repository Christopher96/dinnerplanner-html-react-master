import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Dish from "../Dish/Dish";
import "./Overview.css";

class Overview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
            menu: this.props.model.getFullMenu(),
            total: this.props.model.getTotalMenuPrice()
        };
    }

    render() {
        let dishList = this.state.menu.map(dish => {
            dish.price = this.props.model.getDishPrice(dish);
            return <Dish key={dish.id} expanded={true} dish={dish} />;
        });
        return (
            <div className="Overview">
                <div id="overviewHeader">
                    <span className="title">My Dinner: {this.state.numberOfGuests} People</span>
                    <Link to="/search" className="btn btn-primary">Go back and edit dinner</Link>
                </div>
                <hr/>
                <div id="overviewDishes">
                    {dishList}
                    <div className="total">
                        <span>
                            <b>Total: </b><span className="value-total-price">{this.state.total}</span> SEK 
                        </span>
                    </div>
                </div>
                <hr/>
                <div id="overviewPrint">
                    <Link to="/printout" id="toPrintBtn" className="btn btn-primary">
                        Print Full Recipe
                    </Link>
                </div>
            </div>
        );
    }
}

export default Overview;
