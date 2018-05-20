import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { readAirportList, searchFlight } from './api';

import SearchFrom from './SearchForm'

class App extends Component {
  state = {
      isLoading: true,
      airports: null,
      searchParams: null,
      flights: null,
  };

  handleSubmit = (params) => {
    console.log(params);
    this.setState({isLoading: true})
    searchFlight(params).then((flights) => {
      this.setState({
        isLoading:false,
        params,
        flights
      });
    }).catch(error => console.warn(error))
  }

  handleReset = () => {
    this.setState({
      searchParams: null,
      flights: null,
    })
  }

  componentDidMount() {
    readAirportList().then( list => {
      this.setState({airports: list, isLoading: false })
    }).catch(error => {
      console.warn(error);
      this.setState({isLoading: false})
    })
  }

  render() {
    const {airports, flights, isLoading} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          {isLoading === true && <p>Loading ...</p>}
          {!isLoading && !flights && 
            <SearchFrom
              airports={airports}
              initialValues={{
                from: "WAW",
                to: "WAW",
                departureDate: "2018-20-05",
                returnDate: "2018-20-05",
              }}
              onSubmit={this.handleSubmit}
              onReset={this.handleReset}
            />
        }
          {!isLoading && flights && <p>Flights list</p>}
      </div>
    );
  }
}

export default App;
