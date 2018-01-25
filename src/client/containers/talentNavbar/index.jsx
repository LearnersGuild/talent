import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { startLoading, fetchLearners, doneLoading } from '../../actions';
import axios from 'axios';

class TalentNavbar extends Component {

  componentWillMount() {
    this.props.startLoading();
    axios.get('http://localhost:3000/api/learners')
    .then(response => response.data)
    .then(data => this.props.fetchLearners(data))
    .then(() => this.props.doneLoading())
    .catch(error => {
      this.props.doneLoading();
      console.log('Error fetching and parsing data: ', error);
      throw error;
    });
  }

  render() {
    return (
      <div className="talent-container">
        <Navbar className="talent-navbar" fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <input type="checkbox" name="hamburger" id="hamburger"></input>
              <label htmlFor="hamburger" className="navbar-icon glyphicon glyphicon-menu-hamburger"></label>
              <h2 className="navbar-title">TALENT</h2>
              <div className="talent-list">{
                  <ul className="talent-nav">
                    <li className="talent-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="talent-item">
                      <Link to="/current">Current</Link>
                    </li>
                    <li className="talent-item">
                      <Link to="/alumni">Alumni</Link>
                    </li>
                    <li className="talent-item">
                      <Link to="/learners">All Learners</Link>
                    </li>
                    <li className="talent-item">
                      <Link to="/skills">Search By Skills</Link>
                    </li>
                  </ul>
                }
              </div>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startLoading, fetchLearners, doneLoading, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentNavbar);
