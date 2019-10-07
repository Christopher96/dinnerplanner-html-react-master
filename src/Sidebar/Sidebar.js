import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Sidebar.css";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
            menu: this.props.model.getFullMenu(),
            total: this.props.model.getTotalMenuPrice()
        };
    }

    componentDidMount() {
        this.props.model.addObserver(this);
    }

    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    update(details) {
        switch(details.event) {
            case "guests":
                this.setState({
                    numberOfGuests: details.data,
                    total: this.props.model.getTotalMenuPrice()
                });
                break;
            case "menu":
                this.setState({
                    menu: details.data,
                    total: this.props.model.getTotalMenuPrice()
                });
                break;
            default:
                break;
        }
    }

    removeDish = (id) => {
        this.props.model.removeDishFromMenu(id);
    }

    onNumberOfGuestsChanged = e => {
        this.props.model.setNumberOfGuests(e.target.value);
    };

    render() {
        let menuItems = this.state.menu.map(dish => {
            let price = this.props.model.getDishPrice(dish);
            return <tr key={dish.id}>
                <td className='value-main-course-name'>
                    <Link to={"/details/"+dish.id}>{dish.title}</Link>
                </td>
                <td>{price} SEK</td>
                <td><button onClick={() => this.removeDish(dish.id)} className="btn btn-primary">&#10005;</button></td>
            </tr>;
        });

        return (
            <div className="Sidebar col-md-3">
                <p className="title"><span className="value-num-guests">{this.state.numberOfGuests}</span> Guests</p>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">People</span>
                    </div>
                    <input
                        type="number"
                        className="input-num-guests form-control"
                        value={this.state.numberOfGuests}
                        onChange={this.onNumberOfGuestsChanged}
                    />
                        </div>
                        <table id="dishTable" className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Dish Name</th>
                                    <th scope="col">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuItems}
                            </tbody>
                        </table>
                        <div className="total">
                            <b>Total: </b><span className="value-total-price">{this.state.total}</span> SEK
                        </div>
                        <Link to="/overview" className="btn btn-primary">
                            Confirm Dinner
                        </Link>
                    </div>
        );
    }
}

export default Sidebar;
