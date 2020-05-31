import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Login from './user/Login';
import JobPage from './job/JobPage';
import './App.css';
import '../materialize/materialize.min.css';
import '../materialize/materialize.min.js';
import { BrowserRouter, Route } from 'react-router-dom';
import AdminPage from './admin/AdminPage';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/home" component={Home} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/" component={Login} />
        </BrowserRouter>
      </Provider>
    )
  }
}
