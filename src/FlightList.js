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
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.flights.map(flight => {
                        const {duration, airports} = aggregate(flight.inboundPath)
                        return (
                            <li>
                                Price: {flight.price} $<br/>
                                Duration: {Math.round(duration)} h<br/>
                                Via: {airports.join(' ')}<br/>
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