import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import Home from './components/home';

const data = [
  {
    id: 1,
    title: "About Learner's Guild",
    information: "This is information about Learner's Guild"
  }
];

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" render={() => <Home data={data} />} />
      </Switch>
    </div>
  </BrowserRouter>
  , document.querySelector('.container'));
