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
        </div>
      </div>
    );
  }
}
