import ObservableModel from "./ObservableModel";
import config from "./config.js";

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this.menu = [];
    this.guests = 4;
  }

  loadState() {
    let guests = window.localStorage.getItem("guests");
    if(guests) {
      this.setNumberOfGuests(guests);
    }

    let menu = window.localStorage.getItem("menu");
    if(menu) {
      menu = JSON.parse(menu);
      menu.forEach(dish => this.addDishToMenu(dish));
    }

  }

  getNumberOfGuests() {
    return this.guests;
  }

  setNumberOfGuests(num) {
    if(num >= 0) {
      this.notifyObservers({
        event: "guests",
        data: num
      });
      this.guests = num;
      window.localStorage.setItem("guests", num);
    } else {
      return false;
    }
  }

  //Returns the dish that is on the menu for selected type 
  getSelectedDish(type) {
    return this.getFullMenu().find(dish => dish.type === type);
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return this.menu;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    return this.getFullMenu().map(res => res.ingredients).flat();
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests.
  getTotalMenuPrice() {
    let totalCost = this.getFullMenu().map(dish => this.getDishPrice(dish)).reduce((acc, price) => acc += price);
    console.log(totalCost);
    return totalCost * this.guests;
  }

  getDishPrice(dish) {
    return Math.round(dish.pricePerServing);
  }

  addDishToMenu(id) {
    this.getDish(id)
      .then(function(dish) {
        this.menu.push(dish);

        const menu = this.menu.map(dish => dish.id);
        window.localStorage.setItem("menu", JSON.stringify(menu));

        this.notifyObservers({
          event: "menu",
          data: dish
        });
      }.bind(this));
  }

  //Removes dish from menu
  removeDishFromMenu(id) {
    this.menu = this.menu.filter(dish => dish.id !== id);
  }

  jsonToQuery(json) {
    return '?' + 
      Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(json[key]);
      }).join('&');
  }

  apiGet(path = "", params = {}) {
    let url = path + this.jsonToQuery(params);
      fetch(config.endpoint+url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Mashape-Key': config.api_key
        }
      })
      .then(res => res.json())
  }

  getAllDishes(type, query) {
    if(!type && !query)
      return this.apiGet("recipes/search")
    return this.apiGet("recipes/search",  { type, query });
  }

  //Returns a dish of specific ID
  getDish(id) {
    return this.apiGet("recipes/"+id+"/information")
      .catch(console.error);
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
