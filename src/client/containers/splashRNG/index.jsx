import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LandingPage from '../../components/landingPage';

class SplashRNG extends Component {
  constructor(props) {
    super(props);
    this.rngProjects = this.rngProjects.bind(this);
  }

  rngProjects() {
    let maxNumber = this.props.guild.learners.length - 1;
    let chosenProjects = [];
    for (let i = 0; i < 6; i++) {
      let rng = Math.floor(Math.random() * maxNumber);
      chosenProjects.push(this.props.guild.learners[rng].projects[0]);
    }

    return chosenProjects;
  }

  render() {
    return (
      <div>
        <LandingPage projectsArray={this.rngProjects()} />
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(SplashRNG);
