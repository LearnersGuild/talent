import React, { Component } from 'react';

import Blurb from '../../components/blurb';
import Profile from './profile';
import Projects from '../../components/projects';

export default class ProfilePage extends Component {
  render() {
    return (
    <div className="container">
      <Profile info={this.props.info} />
      <div className="row">
        <div className="col-lg-6">
          <Blurb info={this.props.experience}/>
        </div>
        <div className="col-lg-6">
          <Blurb info={this.props.skills}/>
        </div>
      </div>
      <h2 className="text-center">Projects</h2>
      <Projects projects={this.props.projects}/>
    </div>
  );
  }
}
