import React, { Component } from "react";
import "./Dish.css";

class Dish extends Component {
  render() {
    let { dish, expanded, model } = this.props;
    let title = dish.title.replace("#WeekdaySupper", "").replace("#ChooseDreams", "");
    let image = (expanded) ? dish.image : "https://spoonacular.com/recipeImages/" + dish.image;
    let price = (expanded) ? <span class="price">{model.getDishPrice(dish)} SEK</span> : null;

    return (
      <div className="Dish">
        <img src={image} alt="" />
        <p class="value-main-course-name">{title}</p>
        {price}
      </div>
    );
  }
}

export default Dish;
