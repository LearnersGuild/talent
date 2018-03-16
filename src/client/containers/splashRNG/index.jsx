import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shuffle from 'lodash.shuffle';
import LandingPage from '../../components/landingPage';

class SplashRNG extends Component {
  constructor(props) {
    super(props);
    this.handleClickProjects = this.handleClickProjects.bind(this);
    this.handleClickLearners = this.handleClickLearners.bind(this);
    this.state = {
      selectedProjects: [],
      selectedLearners: [],
    };
  }

  rngProjects() {
    let chosenProjects = [];
    const shuffledLearners = shuffle(this.props.guild.learners);
    const selectedLearners = shuffledLearners.slice(0, 8);
    selectedLearners.forEach(learner => {
      if (learner.projects[0]) {
        chosenProjects.push(learner.projects[0]);
      }
    });
    if (chosenProjects.length < 8) {
      chosenProjects.push(shuffledLearners[8].projects[0]);
    }
    this.setState({ selectedProjects: chosenProjects });
  }

  handleClickProjects() {
    this.rngProjects();
  }

  handleClickLearners() {
    this.setState({
      selectedLearners: shuffle(this.props.guild.learners).slice(0, 6),
    });
  }

  componentDidMount() {
    this.rngProjects();
    this.setState({
      selectedLearners: shuffle(this.props.guild.learners).slice(0, 6),
    });
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
