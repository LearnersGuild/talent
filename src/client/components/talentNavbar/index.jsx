import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

export default class TalentNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar className="navbar" fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <ul className="navbar-nav list-group">
                <li className="nav-item list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-item list-group-item">
                  <Link to="/alumni">Alumni</Link>
                </li>
              </ul>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey="1" title="Search By" id="basic-nav-dropdown">
              <MenuItem eventKey="1.1">People</MenuItem>
              <MenuItem eventKey="1.2">Skills</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
