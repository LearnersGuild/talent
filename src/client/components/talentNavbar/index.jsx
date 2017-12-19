import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { fetchLearners } from '../../actions';

class TalentNavbar extends Component {

  componentWillMount() {
    this.props.fetchLearners();
  }

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
                  <Link to="/current">Current</Link>
                </li>
                <li className="nav-item list-group-item">
                  <Link to="/alumni">Alumni</Link>
                </li>
                <li className="nav-item list-group-item">
                  <Link to="/learners">All Learners</Link>
                </li>
                <li className="nav-item list-group-item">
                  <Link to="/skills">Search By Skills</Link>
                </li>
              </ul>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLearners }, dispatch);
}

export default connect(null, mapDispatchToProps)(TalentNavbar);
