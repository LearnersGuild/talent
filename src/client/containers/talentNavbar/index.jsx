import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { startLoading, fetchLearners, doneLoading, hideNavbar, showNavbar } from '../../actions';
import axios from 'axios';

class TalentNavbar extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.startLoading();
    axios.get('http://localhost:3000/api/learners')
    .then(response => response.data)
    .then(data => this.props.fetchLearners(data))
    .then(() => this.props.doneLoading())
    .then(() => {
      if (window.innerWidth <= 736) {
        this.props.hideNavbar();
      }
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  handleClick() {
    if (this.props.guild.exists === false) {
      this.props.showNavbar();
    } else {
      this.props.hideNavbar();
    }
  }

  render() {
    return (
      <div className="talent-container">
        <Navbar className="talent-navbar" fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <button ref="hamburger" className="navbar-icon glyphicon glyphicon-menu-hamburger" onClick={this.handleClick}></button>
              <h2 className="navbar-title">TALENT</h2>
              <div>{
                  this.props.guild.exists ? (
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
                  ) : null

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
  return bindActionCreators({ startLoading, fetchLearners, doneLoading, hideNavbar, showNavbar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentNavbar);
