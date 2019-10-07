import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Dish.css";

class Dish extends Component {
    render() {
        const { dish, expanded } = this.props;
        const title = dish.title.replace("#WeekdaySupper", "").replace("#ChooseDreams", "");
        const image = (expanded) ? dish.image : "https://spoonacular.com/recipeImages/" + dish.image;
        const price = (expanded) ? <span className="price">{dish.price} SEK</span> : null;

        return (
            <Link to={"/details/"+dish.id}>
                <div className="Dish">
                    <img src={image} alt="" />
                    <p className="value-main-course-name">{title}</p>
                    {price}
                </div>
            </Link>
        );
    }
}

export default Dish;
