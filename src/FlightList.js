import React, { Component } from 'react';

// stolen from mykulyak :D
function aggregate(path) {
    return path.reduce((memo, item, index, arr) => {
      const { airportFrom, airportTo, length } = item;
      memo.duration += length;
      if (index === 0 && arr.length > 1) {
        memo.airports.push(airportFrom);
      }
      memo.airports.push(airportTo);
      return memo;
    }, {
      duration: 0,
      airports: [],
    });
}

export default class FlightList extends Component {
    constructor(props){
        super(props)
        this.state = {
            priceFrom: null,
            priceTo: null,
            flights : this.props.flights,
        }
    }

    onPriceFromChange = event => {
        this.setState({
            priceFrom: event.target.value
        })
    }

    onPriceToChange = event => {
        this.setState({
            priceTo: event.target.value
        })
    }

    filterFlights(flights) {
        let { priceFrom, priceTo } = this.state;
        const validFrom = priceFrom === String(Number(priceFrom));
        const validTo = priceTo === String(Number(priceTo));
        if (validFrom && validTo) {
          return flights.filter(({ price }) => price >= priceFrom && price <= priceTo);
        } else if (validFrom) {
          return flights.filter(({ price }) => price >= priceFrom);
        } else if (validTo) {
          return flights.filter(({ price }) => price <= priceTo);
        } else {
          return flights;
        }
      }

    handleFilterFlights = () => {
        console.log(this.filterFlights(this.props.flights));
        this.setState({
          flights: this.filterFlights(this.props.flights)
        });
    };

    render() {
        return (
            <div>
                <form>
                    <label>
                        Price from:
                        <input
                            type="number"
                            value={this.state.priceFrom}
                            onChange={this.onPriceFromChange}
                            onBlur={this.handleFilterFlights}    
                        />
                    </label>
                    <label>
                        Price to:
                        <input
                            type="number"
                            value={this.state.priceTo}
                            onChange={this.onPriceToChange}
                            onBlur={this.handleFilterFlights} 
                        />
                    </label>
                </form>
                <ul>
                    {this.state.flights.map(flight => {
                        const {duration, airports} = aggregate(flight.inboundPath)
                        return (
                            <li>
                                <p>Price: {flight.price} $</p>
                                <p>Duration: {Math.round(duration)} h</p>
                                {airports.length > 1 ? (
                                <p>Via: {airports.slice(1, -1).join(', ')}</p>
                                ) : (
                                <p>Direct</p>
                                )}
                            </li>
                    )})}
                </ul>
                <button 
                    type="button"
                    onClick={this.props.onReset}
                >
                    POWROT
                </button>
            </div>
        )
    }
}