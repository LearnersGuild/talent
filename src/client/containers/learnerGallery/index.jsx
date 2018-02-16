import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionPage from '../collection';
import Blurb from '../../components/blurb';
import _ from 'lodash';
import { searchBySkill, searchByName, setAll, setAlumni, setCurrent, showOptions, hideOptions, resetAdvancedSearch } from '../../actions';
import './index.css';
import SkillsSearch from '../skillsSearch';

class LearnerGallery extends Component {
  constructor(props) {
    super(props);
    this.props.setAll();
    this.state = {
      searchBar: '',
      learnerBar: 'all',
      skillBar: 'skill',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectLearner = this.handleSelectLearner.bind(this);
    this.handleSelectSkill = this.handleSelectSkill.bind(this);
    this.changeOptions = this.changeOptions.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ searchBar: event.target.value });
  }

  handleSelectLearner(event) {
    const select = event.target.value;
    if (select === 'all') {
      this.props.setAll();
    } else if (select === 'alumni') {
      this.props.setAlumni();
    } else {
      this.props.setCurrent();
    }

    this.setState({ learnerBar: select });
  }

  handleSelectSkill(event) {
    if (event.target.value === 'skill') {
      this.props.searchBySkill();
    } else {
      this.props.searchByName();
    }

    this.setState({ skillBar: event.target.value });
  }

  filterByName () {
    const learnersToFilterThrough = this.determineSubsetOfLearners(this.props.guild.typeOfLearners);
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
    if (this.props.guild.advancedSkillSearch.length > 0) {
      return this.filterByMultipleSkills(this.props.guild.advancedSkillSearch);
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
    return this.filterByType(this.props.guild.typeOfLearners).filter(learner => {
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

  changeOptions() {
    if (this.props.guild.showAdvancedSearch) {
      this.props.hideOptions();
      this.props.resetAdvancedSearch();
    } else {
      this.props.showOptions();
    }
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
          <select
            value={this.state.learnerBar}
            onChange={this.handleSelectLearner}
            className="selectbar"
          >
            <option value='all'>all</option>
            <option value='alumni'>alumni</option>
            <option value='current'>current</option>
          </select>
          <input
            type="text"
            placeholder="search..."
            results="0"
            onChange={this.handleChange}
            className="searchbar"
            value={this.state.searchBar}
          />
          <select
            value={this.state.skillBar}
            onChange={this.handleSelectSkill}
            className="selectbar"
          >
            <option value="skill">skill</option>
            <option value="name">name</option>
          </select>
        </div>
        <div className="advsearch-container">
          <span className="sizing-span" />
          <span className="sizing-span" />
          <button type="button" className="advsearch" onClick={this.changeOptions}>Advanced Search</button>
        </div>
        <div>
          {
            this.props.guild.showAdvancedSearch
              ? <SkillsSearch />
              : null
          }
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

export default connect(mapStateToProps, { searchBySkill, searchByName, setAll, setAlumni, setCurrent, showOptions, hideOptions, resetAdvancedSearch })(LearnerGallery);
