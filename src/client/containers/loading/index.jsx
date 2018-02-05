import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLearnersRequest } from '../../actions';
import './index.css';

class Loading extends Component {

  componentDidMount() {
    this.props.fetchLearnersRequest('http://localhost:3000/api/learners');
  }

  establishNames() {
    const inputNames = this.filterDuplicates().map(skill => skill);
    let tempObj = {};
    let objectNames = inputNames.map((skill, index) => {
      tempObj[`${skill}`] = 'off';
      return tempObj;
    });
    return tempObj;
  }

  filterDuplicates() {
    const uniqueSkills = [];
    this.grabSkills().forEach(skill => {
      if (uniqueSkills.includes(skill)) {
        return;
      } else {
        uniqueSkills.push(skill);
      }
    });
    return uniqueSkills;
  }

  grabSkills() {
    const listOfSkills = [];
    this.props.guild.learners.forEach(learner => {
      return learner.skills.forEach(skill => {
        listOfSkills.push(skill.skills);
      });
    });
    return listOfSkills;
  }

  render() {
    return (
      <div>
        {
          this.props.guild.loading
            ? (<div><div className="flex-center"><img className="lg-loading" src="/LearnerLogo.png" /></div><div className="footer-filler"></div></div>)
            : this.props.children
        }
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps, { fetchLearnersRequest })(Loading);
