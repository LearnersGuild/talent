import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionPage from '../collection';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { searchBySkill, searchByName } from '../../actions';

class LearnerGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      learnersByType: this.determineSubsetOfLearners(this.props.type),
      searchBar: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleSearch(event) {
    if (this.props.guild.nameSearch) {
      this.props.searchBySkill();
    } else {
      this.props.searchByName();
    }
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
    let searchTerm = this.state.selectedLearners.toLowerCase().split();
    let learnersBySkill = this.filterByOneSkill(searchTerm);

    const searchBar = this.state.searchBar.toLowerCase().split(' ')[0];
    const foundLearners = filteredLearner.filter(learner => {
      return learner.name.toLowerCase().includes(searchBar);
    });

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

  filterByOneSkill(skillToSearchBy) {
    return this.state.learnersByType.filter(learner => {
      const skillKeys = Object.values(learner.skills).map(object => object.skills);
      let lowerCaseSkillKeys = skillKeys.map(key => key.toLowerCase());
      for (let i = 0; i < lowerCaseSkillKeys.length; i++) {
        if (lowerCaseSkillKeys[i].includes(skillToSearchBy)) {
          return learner;
        }
      }
    });
  }

  filterByMultipleSkills (searchArray) {
    return this.props.guild.learners.filter(learner => {
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

  filterByType(type) {
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
    let names = this.state.learnersByType;
    if (this.props.guild.nameSearch) {
      names = this.filterByName(this.state.searchBar);
    } else {
      names = this.filterByOneSkill(this.state.searchBar);
    }

    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="search..."
            results="0"
            onChange={this.handleChange}
          /><br/>
          <label>
            <input
              type='radio'
              name='searchBy'
              onChange={this.toggleSearch}
              checked={this.props.guild.nameSearch}
            /> Name
          </label>
          <label>
            <input
              type='radio'
              name='searchBy'
              onChange={this.toggleSearch}
              checked={this.props.guild.skillSearch}
            /> Skill
          </label>
        </div>

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchBySkill, searchByName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnerGallery);
