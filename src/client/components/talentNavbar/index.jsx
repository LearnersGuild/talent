import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class TalentNavbar extends Component {

  render() {
    return (
      <div className="talent-container">
        <div className="talent-navbar">
          <input type="checkbox" name="hamburger" id="hamburger"></input>
          <label htmlFor="hamburger" className="navbar-icon">&#9776;</label>
          <Link to="/"><span className="navbar-title">TALENT</span></Link>
          <Link to="/learners"><span className="navbar-title">LEARNERS</span></Link>
        </div>
      </div>
    );
  }
}
