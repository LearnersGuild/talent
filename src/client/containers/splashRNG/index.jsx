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

  componentDidMount() {
    this.rngProjects();
    this.rngLearners();
  }

  rngProjects() {
    let chosenProjects = [];
    let maxNumber = this.props.guild.allLearners.length;
    for (let i = 0; i < 8; i++) {
      let rng = Math.floor(Math.random() * maxNumber);
      if (chosenProjects.includes(this.props.guild.allLearners[rng].projects[0])) {
        i--;
        continue;
      }

      chosenProjects.push(this.props.guild.allLearners[rng].projects[0]);
    }

    this.setState({ selectedProjects: chosenProjects });
  }

  rngLearners() {
    let chosenLearners = [];
    let maxNumber = this.props.guild.allLearners.length;
    for (let i = 0; i < 6; i++) {
      let rng = Math.floor(Math.random() * maxNumber);
      if (chosenLearners.includes(this.props.guild.allLearners[rng])) {
        i--;
        continue;
      }
      chosenLearners.push(this.props.guild.allLearners[rng]);
    }
    this.setState({ selectedLearners: chosenLearners });
  }

  handleClickProjects() {
    this.rngProjects();
  }

  handleClickLearners() {
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
