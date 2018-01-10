import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LandingPage from '../../components/landingPage';

class SplashRNG extends Component {
  constructor(props) {
    super(props);
    this.rngProjects = this.rngProjects.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  rngProjects() {
    let chosenProjects = [];
    let maxNumber = this.props.guild.learners.length;
    for (let i = 0; i < 6; i++) {
      let rng = Math.floor(Math.random() * maxNumber);
      if(chosenProjects.includes(this.props.guild.learners[rng].projects[0])) {
        i--;
        continue;
      }
      chosenProjects.push(this.props.guild.learners[rng].projects[0]);
    }
    return chosenProjects;
  }

  handleClick() {
    this.rngProjects();
  }

  render() {
    return (
      <div>
        <LandingPage projectsArray={this.rngProjects()} />
        <div className="more-projects">
          <button onClick={this.handleClick}> Needs more button </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(SplashRNG);
