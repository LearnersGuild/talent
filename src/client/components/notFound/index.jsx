import React, { Component } from 'react';
import './index.css';
import TalentNavbar from '../talentNavbar';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <TalentNavbar />
        <div className="page-not-found-container">
          <img src="http://maxpixel.freegreatpicture.com/static/photo/2x/File-Not-Found-Not-Found-404-Error-2384304.jpg"/>
          <div className="footer-filler"></div>
        </div>
      </div>
    );
  }
}
