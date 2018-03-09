import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LandingPage from '../../components/landingPage';

class SplashRNG extends Component {
  constructor(props) {
    super(props);
    this.rngProjects = this.rngProjects.bind(this);
    this.handleClickProjects = this.handleClickProjects.bind(this);
    this.handleClickLearners = this.handleClickLearners.bind(this);
    this.state = {
      selectedProjects: [],
      selectedLearners: [],
    };
  }

  rngProjects() {
    let chosenProjects = [];
    let maxNumber = this.props.guild.learners.length;
    let numberOfProjectsToChoose;
    if (6 > maxNumber) {
      numberOfProjectsToChoose = maxNumber;
    } else {
      numberOfProjectsToChoose = 6;
    }

    for (let i = 0; i < numberOfProjectsToChoose; i++) {
      let rng = Math.floor(Math.random() * maxNumber);
      if (chosenProjects.includes(this.props.guild.learners[rng].projects[0])) {
        i--;
        continue;
      }

      chosenProjects.push(this.props.guild.learners[rng].projects[0]);
    }

    this.setState({ selectedProjects: chosenProjects });
  }

  rngLearners() {
    let chosenLearners = [];
    let maxNumber = this.props.guild.learners.length;
    let numberOfLearnersToChoose;
    if (6 > maxNumber) {
      numberOfLearnersToChoose = maxNumber;
    } else {
      numberOfLearnersToChoose = 6;
    }

    for (let i = 0; i < numberOfLearnersToChoose; i++) {
      let rng = Math.floor(Math.random() * maxNumber);
      if (chosenLearners.includes(this.props.guild.learners[rng])) {
        i--;
        continue;
      }

      chosenLearners.push(this.props.guild.learners[rng]);
    }

    this.setState({ selectedLearners: chosenLearners });
  }

  handleClickProjects() {
    this.rngProjects();
  }

  handleClickLearners() {
    this.rngLearners();
  }

  componentDidMount() {
    this.rngProjects();
    this.rngLearners();
  }

  render() {
    return (
      <div>
        <LandingPage projectsArray={this.state.selectedProjects} learnersArray={this.state.selectedLearners} />
        <button className="more-projects-button" onClick={this.handleClickProjects}> See More Projects </button>
        <button className="more-learners-button" onClick={this.handleClickLearners}> See More Learners </button>
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(SplashRNG);
