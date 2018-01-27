import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionPage from '../collection';
import _ from 'lodash';

class LearnerGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ searchBar: event.target.value });
  }

  filterByName () {
    let learnersToFilterThrough;
    if (this.props.type) {
      learnersToFilterThrough = this.determineSubsetOfLearners(this.props.type);
    } else {
      let searchSkills = this.props.match.params.searchSkill.replace(/search=/, '').split(',');
      learnersToFilterThrough = this.filterByMultipleSkills(searchSkills);
    }

    if (!this.state.searchBar) {
      return learnersToFilterThrough;
    }

    let searchTerm = this.state.searchBar.toLowerCase().split();
    const foundLearners = learnersToFilterThrough.filter(learner => {
      return learner.name.toLowerCase().includes(this.state.searchBar.toLowerCase());
    });
    if (foundLearners.length === 0) {
      return this.filterByOneSkill(searchTerm, learnersToFilterThrough);
    }

    return foundLearners;
  }

  filterByOneSkill (skillToSearchBy, arrayOfLearners) {
    return arrayOfLearners.filter(learner => {
      const skillKeys = Object.values(learner.skills).map(object => object.skills);
      let lowerCaseSkillKeys = skillKeys.map(key => key.toLowerCase());
      for (let i = 0; i < lowerCaseSkillKeys.length; i++) {
        if (lowerCaseSkillKeys[i].includes(skillToSearchBy)) {
          return learner;
        };
      }
    });
  }

  filterByMultipleSkills (searchArray) {
    return this.props.guild.allLearners.filter(learner => {
      const skillKeys = Object.values(learner.skills).map(object => object.skills);
      let lowerCaseSkillKeys = skillKeys.map(key => key.toLowerCase());
      for (let i = 0; i < searchArray.length; i++) {
        if (lowerCaseSkillKeys.includes(searchArray[i].toLowerCase())) {
          if (i + 1 === searchArray.length) {
            return learner;
          }
        } else {
          break;
        }
      }
    });
  }

  determineSubsetOfLearners (type) {
    if (type === 'alumni') {
      return this.props.guild.alumni;
    } else if (type === 'current') {
      return this.props.guild.currentLearners;
    } else if (type === 'all') {
      return this.props.guild.allLearners;
    }
  }

  getProjects(learners) {
    const allProjects = learners.map(learner => learner.projects);
    return _.flatMapDeep(allProjects);
  }

  render() {
    let names = this.filterByName();
    return (
      <div>
          <form>
            <input type="text" placeholder="search" onChange={this.handleChange}></input>
          </form>
          <CollectionPage
          data={names}
          info={ { name: 'ABOUT LEARNERS GUILD', story: 'This is just a sentence.' } }
          projects={this.getProjects(names)}
          />
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(LearnerGallery);
