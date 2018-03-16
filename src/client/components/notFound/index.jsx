import React, { Component } from 'react';
import './index.css';
import TalentNavbar from '../talentNavbar';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <TalentNavbar />
        <div className="page-not-found-container">
          <img src="/Talent-Not-Found.jpg"/>
          <div className="footer-filler"></div>
        </div>
      </div>
    );
  }
}
