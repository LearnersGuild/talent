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
    const filteredLearner = this.determineSubsetOfLearners(this.props.type);

    if (!this.state.searchBar) {
      return filteredLearner;
    }

    const searchTerm = this.state.searchBar.toLowerCase().split(' ')[0];
    const foundLearners = filteredLearner.filter(learner => {
      return learner.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (foundLearners.length === 0) {
      return this.filterByOneSkill(searchTerm);
    }

    return foundLearners;
  }

  determineSubsetOfLearners(type) {
    if (type) {
      return this.filterByType(type);
    } else {
      const searchSkills = this.props.match.params.searchSkill.replace(/search=/, '').split(',');
      return this.filterByMultipleSkills(searchSkills);
    }
  }

  filterByOneSkill (skillToSearchBy) {
    return this.props.guild.learners.filter(learner => {
      const skillKeys = Object.values(learner.skills).map(object => object.skills);
      const lowerCaseSkillKeys = skillKeys.map(key => key.toLowerCase());
      return lowerCaseSkillKeys.includes(skillToSearchBy);
    });
  }

  filterByMultipleSkills (searchArray) {
    return this.props.guild.learners.filter(learner => {
      const skillKeys = Object.values(learner.skills).map(object => object.skills);
      const lowerCaseSkillKeys = skillKeys.map(key => key.toLowerCase());
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

  filterByType (type) {
    if (type === 'all') {
      return this.props.guild.learners;
    }

    return this.props.guild.learners.filter(learner => {
      if (type === 'alumni') {
        return learner.alumni === true;
      } else if (type === 'current') {
        return learner.alumni === false;
      }
    });
  }

  getProjects(learners) {
    const allProjects = learners.map(learner => learner.projects);
    return _.flatMapDeep(allProjects);
  }

  render() {
    const names = this.filterByName();
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
