import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default class Learners extends Component {
  render() {
    return this.props.data.map(learner => {
      return (
        <div>
          <p>{learner.name}</p>
        </div>
        )
    })
  }
}