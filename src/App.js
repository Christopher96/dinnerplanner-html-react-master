import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import DishDetails from "./DishDetails/DishDetails";
import Printout from "./Printout/Printout";
import Overview from "./Overview/Overview";
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
                <Link to="/search">
                    <header className="text-white bg-primary">
                        <span>{this.state.title}</span>
                    </header>
                </Link>
                <div className="container-fluid page-content">
                    <Route exact path="/" component={Welcome} />
                    <Route
                        path="/search"
                        render={() => <SelectDish model={modelInstance} />}/>
                    <Route
                        path="/details/:id"
                        render={({ match }) => <DishDetails model={modelInstance} id={match.params.id} />}/>
                    <Route
                        path="/printout"
                        render={() => <Printout model={modelInstance} />}/>
                    <Route
                        path="/overview"
                        render={() => <Overview model={modelInstance} />}/>
                </div>
            </div>
        );
    }
}

export default App;
