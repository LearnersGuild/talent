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

  // componentDidMount() {
  //   console.log('In did mount');
  // }
  //
  // componentWillMount() {
  //   console.log('In will mount');
  // }

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
    return filteredLearner.filter(learner => {
      let searchSkill = this.state.selectedLearners.toLowerCase().split();
      let learnersBySkill = this.filterBySkill(searchSkill);
      if (learnersBySkill.length > 0) {
        return learnersBySkill;
      }
      if (learner.name.toLowerCase().includes(this.state.selectedLearners.toLowerCase())) {
        return learner;
      }
    });
  }

  filterBySkill (searchArray) {
    // let searchSkill = this.props.match.params.searchSkill.replace(/search=/, '').split(',');
    return this.props.guild.learners.filter(learner => {
      const objectKeys = Object.values(learner.skills).map(object => object.skills);
      let lowerCaseObjectKeys = objectKeys.map(key => key.toLowerCase());
      // console.log(lowerCaseObjectKeys);
      for (let i = 0; i < searchArray.length; i++) {
        if (lowerCaseObjectKeys.includes(searchArray[i])) {
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
    return (
      <div>
          <form>
            <input type="text" placeholder="search" onChange={this.handleChange}></input>
          </form>
          <CollectionPage
          data={this.filterByName()}
          info={ { name: 'ABOUT LEARNERS GUILD', story: 'This is just a sentence.' } }
          projects={this.getProjects(this.filterByName())}
          />
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(LearnerGallery);
