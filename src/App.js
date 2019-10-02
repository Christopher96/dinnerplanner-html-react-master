import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import DishDetails from "./DishDetails/DishDetails";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="text-white bg-primary">
          <span>{this.state.title}</span>
        </header>
        <div className="container-fluid page-content">
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
          <Route
            path="/details/:id"
            render={({ match }) => <DishDetails model={modelInstance} id={match.params.id} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
