import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Profile from './profile';
import Projects from '../../components/projects';
import ExperienceList from '../../components/experienceList';
import SkillList from '../../components/skillList';

class ProfilePage extends Component {

  filterLearner (githubHandle) {
    return this.props.learners.filter(learner => {
      let currentLearner = learner.github_handle === githubHandle;
      return currentLearner;
    });
  }

  render() {
    // const githubHandle = window.location.pathname.replace(/\/learners\//, '');
    const githubHandle = this.props.match.url.replace(/\/learners\//, '');
    const selectedLearner = this.filterLearner(githubHandle);

    return (
    <div className="container">
      <Profile info={selectedLearner[0]} />
      <div className="row">
        <div className="col-lg-6">
          <ExperienceList experiences={selectedLearner[0].experience} />
        </div>
        <div className="col-lg-6">
          <SkillList skills={selectedLearner[0].skills} />
        </div>
      </div>
      <h2 className="text-center">Projects</h2>
      <Projects projects={selectedLearner[0].projects} />
    </div>
  );
  }
}

function mapStateToProps({ learner }) {
  return { learners: learner.payload };
}

export default connect(mapStateToProps)(ProfilePage);
