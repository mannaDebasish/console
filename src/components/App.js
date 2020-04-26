import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Login from './user/Login';
import JobPage from './job/JobPage';
import './App.css';
import '../materialize/materialize.min.css';
import '../materialize/materialize.min.js';
import { BrowserRouter, Route } from 'react-router-dom';
import JobSearch from './job/JobSearch';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Login} />
        </BrowserRouter>
      </Provider>
    )
  }
}
