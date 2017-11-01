import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import css from '../../public/index.scss'
import {tempInfo, userTempInfo, fakeDB, fakeProjects, experience, skills} from '../server/db/mock-data'

import App from './components/app'
import TalentNavbar from './components/talentNavbar';

render((
    <BrowserRouter>
      <div>
        <TalentNavbar/>
        <App />
      </div>
    </BrowserRouter>
)
  , document.querySelector('.container'));
