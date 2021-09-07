import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import {UnitContextProvider} from './Context/UnitContext';

ReactDOM.render(
  <UnitContextProvider>
    <App />
  </UnitContextProvider>,
  document.getElementById('root')
);

