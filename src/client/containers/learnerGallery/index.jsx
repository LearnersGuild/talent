import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionPage from '../collection';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { doneLoading } from '../../actions';

class LearnerGallery extends Component {
  constructor(props) {
    super(props);

    if (this.props.type) {
      this.state = {
        selectedLearners: this.filterByType(this.props.type),
      };
    } else {
      this.state = {
        selectedLearners: this.filterBySkill(),
      };
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.doneLoading();
  }

  handleChange (event) {
    event.preventDefault();
    this.setState({ selectedLearners: event.target.value });
  }

  filterByName () {
    let filteredLearner;
    if (this.props.type) {
      filteredLearner = this.filterByType(this.props.type);
    } else {
      filteredLearner = this.filterBySkill();
    }
    if (Array.isArray(this.state.selectedLearners)) {
      return filteredLearner;
    }
    return filteredLearner.filter(learner => {
      if (learner.name.toLowerCase().includes(this.state.selectedLearners.toLowerCase())) {
        return learner;
      }
    });
  }

  filterBySkill () {
    let searchSkill = this.props.match.params.searchSkill.replace(/search=/, '').split(',');
    return this.props.guild.learners.filter(learner => {
      const objectKeys = Object.values(learner.skills).map(object => object.skills);
      for (let i = 0; i < searchSkill.length; i++) {
        if (objectKeys.includes(searchSkill[i])) {
          if (i + 1 === searchSkill.length) {
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
        {
          this.props.guild.loading ? (<div className="flex-center"><img className="lg-loading" src="/LearnerLogo.png" /></div>) : (<CollectionPage
                    data={this.filterByName()}
                    info={ { name: 'About Learners Guild', story: 'This is just a sentence.' } }
                    projects={this.getProjects(this.filterByName())}
                  /> )
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doneLoading }, dispatch);
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnerGallery);
