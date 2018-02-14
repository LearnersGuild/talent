import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionPage from '../collection';
import Blurb from '../../components/blurb';
import _ from 'lodash';
import { searchBySkill, searchByName, setAll, setAlumni, setCurrent } from '../../actions';
import { withRouter } from 'react-router-dom';
import './index.css';

class LearnerGallery extends Component {
  constructor(props) {
    super(props);
    if (this.props.match.params.searchSkill) {
      this.state = {
        searchBar: '',
        fromAdvancedSearch: true,
      };
    } else {
      this.state = {
        searchBar: '',
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ searchBar: '' });
    }
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
    const learnersToFilterThrough = this.determineSubsetOfLearners(this.props.type);
    if (!this.state.searchBar) {
      return learnersToFilterThrough;
    }

    const searchBar = this.state.searchBar.toLowerCase().split(' ')[0];
    const foundLearners = learnersToFilterThrough.filter(learner => {
      return learner.name.toLowerCase().includes(searchBar);
    });

    return foundLearners;
  }

  determineSubsetOfLearners(type) {
    if (this.state.fromAdvancedSearch) {
      const searchSkills = this.props.match.params.searchSkill.replace(/search=/, '').split(',');
      return this.filterByMultipleSkills(searchSkills);
    } else {
      return this.filterByType(type);
    }
  }

  filterByOneSkill(skillToSearchBy) {
    return this.determineSubsetOfLearners(this.props.guild.typeOfLearners).filter(learner => {
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
    let names;
    if (this.props.guild.nameSearch) {
      names = this.filterByName(this.state.searchBar);
    } else {
      names = this.filterByOneSkill(this.state.searchBar);
    }

    return (
      <div className="learner-gallery-container" >
        <Blurb info={ { name: 'FIND YOUR TALENT', story: '' } } />
        <div className="search-form">
          <input
            type="text"
            placeholder="search..."
            results="0"
            onChange={this.handleChange}
            className="searchbar"
            value={this.state.searchBar}
          />
          <div>
            <label className="search-by-container">
              <input
                type='radio'
                name='searchBy'
                onChange={this.toggleSearch}
                checked={this.props.guild.nameSearch}
                className="search-form-radio"
              />
              { this.props.guild.nameSearch ? (
                <span className="checkbox-checked">Name</span>
              ) : (
                <span className="checkbox">Name</span>
              ) }
            </label>
            <label className="search-by-container">
              <input
                type='radio'
                name='searchBy'
                onChange={this.toggleSearch}
                checked={this.props.guild.skillSearch}
                className="search-form-radio"
              />
              { this.props.guild.skillSearch ? (
                <span className="checkbox-checked">Skill</span>
              ) : (
                <span className="checkbox">Skill</span>
              ) }
            </label>
          </div>
        </div>

        <CollectionPage
          data={names}
          projects={this.getProjects(names)}
        />
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default withRouter(connect(mapStateToProps, { searchBySkill, searchByName, setAll, setAlumni, setCurrent })(LearnerGallery));
