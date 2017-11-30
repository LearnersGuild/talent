import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionPage from '../../containers/collection';
import _ from 'lodash';

class LearnerGallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentView: this.filterLearner(this.props.type)
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    this.setState({currentView: event.target.value})
  }

  filterByName () {
    const filteredLearner = this.filterLearner(this.props.type)
    if (Array.isArray(this.state.currentView)) {
      return this.filterLearner(this.props.type)
    }
    return filteredLearner.filter(learner => {
      if (learner.name.toLowerCase().startsWith(this.state.currentView.toLowerCase())) {
        return learner
      }
    })
  }

  filterLearner (type) {
    return this.props.learners.filter(learner => {
      if (type === 'alumni') {
        if (learner.alumni === true) {
          return learner;
        }
      } else if (type === 'current') {
        if (learner.alumni === false) {
          return learner;
        }
      } else if (type === 'all') {
        return learner
      }
      else if (type === undefined){
        // console.log("this.props.match.params.searchSkill:::", this.props.match.params.searchSkill)
        let searchSkill = window.location.search.replace(/\?search=/, '').split(',')
        for(let i = 0; i < searchSkill.length; i++) {
          const objectKeys = Object.values(learner.skills).map(object => object.skills);
          if(objectKeys.includes(searchSkill[i])){
            if(i + 1 === searchSkill.length) {
              return learner;
            } else {
              continue;
            }
          } else {
            break;
          }
        }
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
          info={ { name: 'About Learners Guild', story: 'This is just a sentence.' } }
          projects={this.getProjects(this.filterByName())}
        />
      </div>
    );
  }
}

function mapStateToProps({ learners }) {
  return { learners };
}

export default connect(mapStateToProps)(LearnerGallery);
