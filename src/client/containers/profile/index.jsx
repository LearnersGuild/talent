import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Profile from './profile';
import Projects from '../../components/projects';
import List from '../../components/list';
import TalentNavbar from '../../components/talentNavbar';
import './index.css';

class ProfilePage extends Component {

  filterLearner (githubHandle) {
    return this.props.guild.learners.filter(learner => learner.github_handle === githubHandle);
  }

  render() {
    const githubHandle = this.props.match.url.replace(/\/learners\//, '');
    const selectedLearner = this.filterLearner(githubHandle)[0];
    return (
      <div>
        <TalentNavbar />
        { selectedLearner ? (
          <div className="container">
            <div className="header-img"></div>
            <div className="projects">
              <span className="projects-profile-title">PROJECTS</span>
              <div className="projects-image-container">
                <div className="gallery-project-images">
                  <Projects projects={selectedLearner.projects} />
                </div>
              </div>
            </div>
            <Profile
              github_handle={selectedLearner.github_handle}
              linkedin_profile={selectedLearner.linkedin_profile}
              twitter={selectedLearner.twitter}
              info={selectedLearner} />
            <div className="profile-info">
              <div className="profile-experiences">
                <List type='projects' elements={selectedLearner.experience} />
              </div>
              <div className="profile-skills">
                <List type='skills' elements={selectedLearner.skills} />
              </div>
            </div>
            <div className="row flex-center">
              <a href={`http://www.linkedin.com/in/${selectedLearner.linkedin_profile}`} target="__blank" >
                <button className="hire-learner-button">
                  HIRE {selectedLearner.name.split(' ')[0]} TODAY
                </button>
              </a>
            </div>
          </div>) : (<Redirect to="/PageNotFound" />) }
      </div>
  );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(ProfilePage);
