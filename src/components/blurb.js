import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


export default class Blurb extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.info.name}</h2>
        <h3>{this.props.info.about}</h3>
      </div>
      ) 
  }
}