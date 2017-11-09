import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class TalentNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey="1" title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey="1.1">Action</MenuItem>
              <MenuItem eventKey="1.2">Another action</MenuItem>
              <MenuItem eventKey="1.3">Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="1.4">Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
