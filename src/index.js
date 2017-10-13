import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import App from './components/app';
import Home from './components/home';
import TalentNavbar from './components/talentNavbar';

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={TalentNavbar} />
  </BrowserRouter>
  , document.querySelector('.container'));
