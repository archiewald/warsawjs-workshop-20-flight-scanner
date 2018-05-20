import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { readAirportList, searchFlight } from './api';

window.searchFlight = searchFlight;
window.readAirportList = readAirportList;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
