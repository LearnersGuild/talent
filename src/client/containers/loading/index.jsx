import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLearners, setSkills, searchByName, doneLoading } from '../../actions';
import axios from 'axios';
import './index.css';

class Loading extends Component {

  componentDidMount() {
    axios.get('http://localhost:3000/api/learners')
    .then(response => response.data)
    .then(data => this.props.fetchLearners(data))
      .then(() => this.props.searchByName())
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
    return inputNames;
  }

  filterDuplicates() {
    const nonDuplicateSkills = [];
    this.grabSkills().forEach(skill => {
      if (nonDuplicateSkills.includes(skill)) {
        return;
      } else {
        nonDuplicateSkills.push(skill);
      }
    });
    return nonDuplicateSkills;
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
  return bindActionCreators({ fetchLearners, setSkills, doneLoading, searchByName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
