import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Posts from './Posts';
import Login from './user/Login';
import JobSearch from './job/JobSearch';
import Postform from './Postform';
import './App.css';
import '../materialize/materialize.min.css';
import '../materialize/materialize.min.js';
import { BrowserRouter, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/post">
            <Postform />
          </Route>
          <Route path="/">
            <JobSearch />
          </Route>
        </BrowserRouter>
      </Provider>
    )
  }
}
