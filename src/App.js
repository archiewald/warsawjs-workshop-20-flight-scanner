import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { readAirportList, searchFlight } from './api';

class App extends Component {
  state = {
      isLoading: true,
      airports: null,
      searchParams: null,
      flights: null,
  };

  componentDidMount() {
    readAirportList().then( list => {
      this.setState({airports: list, isLoading: false })
    }).catch(error => {
      console.warn(error);
      this.setState({isLoading: false})
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          {this.state.isLoading === true && <p>Loading ...</p>}
          {!this.state.isLoading && !this.state.flights && <p>Search from</p>}
          {!this.state.isLoading && this.state.flights && <p>Flights list</p>}
      </div>
    );
  }
}

export default App;
