import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLearners, setSkills, doneLoading } from '../../actions';
import axios from 'axios';

class Loading extends Component {

  componentDidMount() {
    axios.get('http://localhost:3000/api/learners')
    .then(response => response.data)
    .then(data => this.props.fetchLearners(data))
    .then(() => this.establishNames())
    .then(skills => this.props.setSkills(skills))
    .then(() => this.props.doneLoading())
    .catch(error => {
      this.props.doneLoading();
      console.log('Error fetching and parsing data: ', error);
      throw error;
    });
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
          this.props.guild.loading ? (<div><div className="flex-center"><img className="lg-loading" src="/LearnerLogo.png" /></div><div className="footer-filler"></div></div>) : this.props.children
        }
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLearners, setSkills, doneLoading, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
