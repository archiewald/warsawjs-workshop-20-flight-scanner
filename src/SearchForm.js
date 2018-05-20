import React, { Component } from 'react';

export default class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = this.props.initialValues
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { from, to, departureDate, returnDate } = this.state;
        this.props.onSubmit({ from, to, departureDate, returnDate });
    };

    handleFromChange = event => {
        this.setState({from: event.target.value})
    }

    handleToChange = event => {
        this.setState({to: event.target.value})
    }

    handleDepartureDateChange = event => {
        this.setState({departureDate: event.target.value})
    }

    handleReturnDateChange = event => {
        this.setState({returnDate: event.target.value})
    }

    render() {
        const {airports} = this.props;
        return (
            <form
                onSubmit={this.handleSubmit}
                onReset={this.props.onReset}
            >
                <label>From
                    <select
                        name="from"
                        value={this.state.from}
                        onChange={this.handleFromChange}
                        >
                        {airports.map(item => (
                            <option value={item.code}>{item.city}, {item.country}</option>
                        ))}
                    </select>
                </label>
                <label>To
                    <select
                        name="to"
                        value={this.state.to}
                        onChange={this.handleToChange}
                        >
                        {airports.map(item => (
                            <option value={item.code}>{item.city}, {item.country}</option>
                        ))}
                    </select>
                </label>
                <label>Departure day</label>
                <input
                    name="departureDate"
                    onChange={this.handleDepartureDateChange}
                    type="date"
                    value={this.state.departureDate}
                />
                <label>Return day</label>
                <input
                    name="returnDate"
                    onChange={this.handleReturnDateChange}
                    type="date"
                    value={this.state.returnDate}
                />
                <button type="submit">SEARCH</button>
                <button type="reset">RESET</button>
            </form>
        )
    }


}