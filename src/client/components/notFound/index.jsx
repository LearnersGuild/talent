import React, { Component } from 'react';
import TalentNavbar from '../talentNavbar';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <TalentNavbar />
        <p> Page Not Found</p>
        <img src="/Page-Not-Found.jpg"/>
        <div className="footer-filler"></div>
      </div>
    );
  }
}
