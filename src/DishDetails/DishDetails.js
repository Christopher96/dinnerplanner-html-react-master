import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../Loader/Loader";
import "./DishDetails.css";

class DishDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dish: null
        };

        this.getDish();
    }

    addToMenu = () => {
        this.props.model.addDishToMenu(this.state.dish);
        this.setState({
            added: true
        })
    }

    getDish = () => {
        this.props.model
            .getDish(this.props.id)
            .then(dish => {
                this.setState({
                    dish,
                    status: "LOADED"
                });
            })
            .catch((e) => {
                console.log(e);
                this.setState({
                    status: "ERROR"
                });
            });
    }

    render() {

        let loader = null;
        let ingredients = null;
        let image = null;
        let instructions = null;
        let added = (this.state.added) ? <span className="added"> Added &#10004;</span> : "";

        switch(this.state.status) {
            case "LOADED":
                instructions = this.state.dish.instructions;
                image = this.state.dish.image;
                ingredients = this.state.dish.extendedIngredients.map(ing => {
                    return <tr key={ing.id}>
                        <td>{ing.amount} {ing.unit}</td>
                        <td>{ing.name}</td>
                        <td>SEK</td>
                        <td>0.00</td>
                    </tr>;
                });
                break;
            case "ERROR":
                loader = "Could not load dish";
                break;
            default:
                loader = <Loader />;
                break;
        }
        return (
            <div className="DishDetails">
                {loader}
                <div className="row">
                    <Sidebar model={this.props.model} />
                    <div id="dishInformation" className="col-md-4">
                        <p className="title"></p>
                        <img src={image} alt="" />
                        <p className="title">Instructions</p>
                        <p className="instructions">
                            {instructions}
                        </p>
                        <Link to="/search" className="btn btn-primary">Back to search</Link>
                    </div>
                    <div className="col-md-5">
                        <span className="title">Ingredients for <span className="people"></span> people</span>
                        <table id="ingredientTable" className="table">
                            <tbody>
                                {ingredients}
                            </tbody>
                        </table>
                        <hr/>
                        <button onClick={this.addToMenu} className="btn btn-primary" disabled={added}>Add to menu</button>
                        {added}
                        <span className="total">Sek 77.20</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetails;
