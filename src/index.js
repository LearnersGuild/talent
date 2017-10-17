import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import Home from './components/home';

const blurbAbout = [
  {
    id: 1,
    title: "About Learner's Guild",
    body: "This is information about Learner's Guild"
  }
];

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Home blurbAbout={blurbAbout} />} />
    </Switch>
  </BrowserRouter>
  , document.querySelector('.container'));
