import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';

export default class TalentNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: true,
      skills: false,
    };
  }

  // searchBy() {
  //   if (this.state.name === true) {
  //
  //   } else {
  //
  //   }
  // }

  // handleChange(type) {
  //   if (type === 'name') {
  //     this.setState({
  //       name: false,
  //       skills: true,
  //     });
  //   } else {
  //     this.setState({
  //       name: true,
  //       skills: false,
  //     });
  //   }
  // }

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
                <li className="nav-item list-group-item">
                  <Link to="/learners">All Learners</Link>
                </li>
              </ul>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey="1" title="Search By" id="basic-nav-dropdown">
              <MenuItem ref="name" eventKey="1.1">Name</MenuItem>
              <MenuItem ref="skills" eventKey="1.2">Skills</MenuItem>
            </NavDropdown>
          </Nav>
          <Navbar.Form>
           <FormGroup>
             <FormControl type="text" placeholder="Search" />
           </FormGroup>
           {' '}
           <Button type="submit">Submit</Button>
         </Navbar.Form>
        </Navbar>
      </div>
    );
  }
}
