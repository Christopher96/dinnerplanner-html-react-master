import React, { Component } from "react";
import Loader from "../Loader/Loader";
import Dish from "../Dish/Dish";
import "./Dishes.css";

class Dishes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: "IDLE",
            query: null,
            type: null
        };
    }

    getDishes = () => {
        this.props.model
            .getAllDishes(this.state.query, this.state.type)
            .then(res => {
                this.setState({
                    dishes: res.results,
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

    setQuery = (e) => this.setState({
        query: e.target.value
    })

    setType = (e) => this.setState({
        type: e.target.value
    })

    render() {
        let dishesList = null;

        switch (this.state.status) {
            case "LOADING":
                dishesList = <Loader />;
                break;
            case "LOADED":
                dishesList = this.state.dishes.map(dish =>{
                    return <Dish key={dish.id} dish={dish} expanded={false} />;
                });
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
                    <input onChange={this.setQuery} className="form-control" type="text" />
                    <select onChange={this.setType} className="form-control custom-select">
                        <option value="">Choose...</option>
                        <option value="starter">Starter</option>
                        <option value="main dish">Main dish</option>
                        <option value="dessert">Dessert</option>
                    </select>
                    <div className="input-group-append">
                        <button onClick={this.getDishes} className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="dish-list">
                    {dishesList}
                </div>
            </div>
        );
    }
}

export default Dishes;
