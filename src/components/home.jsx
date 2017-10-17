import React, { Component } from 'react';

import TalentNavbar from './talentNavbar';
import Blurb from './blurb';

export default class Home extends Component {
  render() {
    return (
      <div>
        <TalentNavbar />
        <Blurb blurbAbout={this.props.blurbAbout} />
      </div>
    );
  }
}
