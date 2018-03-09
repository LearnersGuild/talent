import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class TalentNavbar extends Component {

  render() {
    return (
      <div>
        <div className="talent-navbar-clip-path" />
        <div className="talent-navbar">
          <Link to="/"><span className="navbar-title">TALENT</span></Link>
          <Link to="/learners"><span className="navbar-title">LEARNERS</span></Link>
        </div>
      </div>
    );
  }
}
