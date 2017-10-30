import React, { Component } from 'react';

import Profile from './profile';
import Projects from '../../components/projects';
import ExperienceList from '../../components/experienceList';
import SkillList from '../../components/skillList';

export default class ProfilePage extends Component {
  render() {
    return (
    <div className="container">
      <Profile info={this.props.info} />
      <div className="row">
        <div className="col-lg-6">
          <ExperienceList list={this.props.info.experience} />
        </div>
        <div className="col-lg-6">
          <SkillList list={this.props.info.skills} />
        </div>
      </div>
      <h2 className="text-center">Projects</h2>
      <Projects projects={this.props.projects} />
    </div>
  );
  }
}
