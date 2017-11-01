import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';



import Profile from './profile';
import Projects from '../../components/projects';
import ExperienceList from '../../components/experienceList';
import SkillList from '../../components/skillList';

class ProfilePage extends Component {
  render() {
    return (
    <div className="container">
      <Profile info={this.props.learner} />
      <div className="row">
        <div className="col-lg-6">
          <ExperienceList list={this.props.learner.experience} />
        </div>
        <div className="col-lg-6">
          <SkillList list={this.props.learner.skills} />
        </div>
      </div>
      <h2 className="text-center">Projects</h2>
      <Projects projects={this.props.learner.projects} />
    </div>
  );
  }
}

function mapStateToProps({ learner }) {
  return { leaner: learner.filter(learner => learner.github_handle === window.location.pathname.replace(/\/learner\//, '')) }
}

export default connect(mapStateToProps)(ProfilePage);