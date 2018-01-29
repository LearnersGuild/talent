import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import Projects from '../../components/projects';
import List from '../../components/list';

class ProfilePage extends Component {

  filterLearner (githubHandle) {
    return this.props.guild.allLearners.filter(learner => {
      let currentLearner = learner.github_handle === githubHandle;
      return currentLearner;
    });
  }

  handleClickLearners() {
    // TODO: handle 'hire' button click with mailto
  }

  render() {
    const githubHandle = this.props.match.url.replace(/\/learners\//, '');
    const selectedLearner = this.filterLearner(githubHandle)[0];

    return (
    <div className="container">
      <Profile github_handle={selectedLearner.github_handle} linkedin_profile={selectedLearner.linkedin_profile} twitter={selectedLearner.twitter} info={selectedLearner} />
      <div className="row">
        <div className="col-lg-6">
          <List type='projects' elements={selectedLearner.experience} />
        </div>
        <div className="col-lg-6">
          <List type='skills' elements={selectedLearner.skills} />
        </div>
      </div>
      <div className="row flex-center">
        <button className="hire-learner-button" onClick={this.handleClickHire}>HIRE {selectedLearner.name.split(' ')[0]} TODAY</button>
      </div>
      <h2 className="text-center">Projects</h2>
      <Projects projects={selectedLearner.projects} />
      <div className="footer-filler"></div>
    </div>
  );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(ProfilePage);
