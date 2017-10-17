import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import Blurb from './blurb'
import Projects from './projects'

export default class Profile extends Component {
  render() {
    return this.props.info.map(learner => {
      return (
        <div>
          <h2>{learner.name}</h2>
          <h3>{learner.about}</h3>
        </div>
        )
    })
  }
}