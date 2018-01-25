import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionPage from '../collection';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

class LearnerGallery extends Component {
  constructor(props) {
    super(props);

    if (this.props.type) {
      this.state = {
        selectedLearners: this.filterByType(this.props.type),
      };
    } else {
      let searchSkill = this.props.match.params.searchSkill.replace(/search=/, '').split(',');
      this.state = {
        selectedLearners: this.filterBySkill(searchSkill),
      };
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ selectedLearners: event.target.value });
  }

  filterByName () {
    let filteredLearner;
    if (this.props.type) {
      filteredLearner = this.filterByType(this.props.type);
    } else {
      let searchSkill = this.props.match.params.searchSkill.replace(/search=/, '').split(',')
      filteredLearner = this.filterBySkill(searchSkill);
    }
    if (Array.isArray(this.state.selectedLearners)) {
      return filteredLearner;
    }
    let filteredLearnerAfter = filteredLearner.filter(learner => {
      let searchSkill = this.state.selectedLearners.toLowerCase().split();
      let learnersBySkill = this.filterBySkill(searchSkill);
      if (learnersBySkill.length > 0) {
        return learnersBySkill;
      } else if (learner.name.toLowerCase().includes(this.state.selectedLearners.toLowerCase())) {
        return learner;
      }
    });
    return filteredLearnerAfter;
  }

  filterBySkill (searchArray) {
    // let searchSkill = this.props.match.params.searchSkill.replace(/search=/, '').split(',');
    return this.props.guild.learners.filter(learner => {
      debugger;
      const objectKeys = Object.values(learner.skills).map(object => object.skills);
      let lowerCaseObjectKeys = objectKeys.map(key => key.toLowerCase());
      for (let i = 0; i < searchArray.length; i++) {
        if (lowerCaseObjectKeys.includes(searchArray[i].toLowerCase())) {
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
    return this.props.guild.learners.filter(learner => {
      if (type === 'alumni') {
        if (learner.alumni === true) {
          return learner;
        }
      } else if (type === 'current') {
        if (learner.alumni === false) {
          return learner;
        }
      } else if (type === 'all') {
        return learner;
      }
    });
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
