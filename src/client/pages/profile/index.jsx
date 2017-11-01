import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';



import Profile from './profile';
import Projects from '../../components/projects';
import ExperienceList from '../../components/experienceList';
import SkillList from '../../components/skillList';

class ProfilePage extends Component {


  filterLearner(githubHandle) {
    learner.payload.filter(learner => {
      learner.github_handle === githubHandle
    })
  }

  render() {
    console.log('1',this.props)
    const githubHandle = window.location.pathname.replace(/\/learners\//, '')
    const selectedLearner = this.props.learner.filterLearner(githubHandle).bind(this)

    console.log('2', selectedLearner )

    return (
    <div className="container">
      <Profile info={selectedLearner} />
      <div className="row">
        <div className="col-lg-6">
          <ExperienceList list={selectedLearner.experience} />
        </div>
        <div className="col-lg-6">
          <SkillList list={selectedLearner.skills} />
        </div>
      </div>
      <h2 className="text-center">Projects</h2>
      <Projects projects={selectedLearner.projects} />
    </div>
  );
  }
}

function mapStateToProps({ learner }) {
  return { learners: learner.payload }
}

export default connect(mapStateToProps)(ProfilePage);
