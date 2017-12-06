import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionPage from '../collection';
import _ from 'lodash';

class LearnerGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: this.filterLearner(this.props.type),
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: true,
    });
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
    // This is to show how errorBoundary behaves
    // throw new Error('Testing that this error boundary works');
  }

  handleChange (event) {
    event.preventDefault();
    this.setState({ currentView: event.target.value });
  }

  filterByName () {
    const filteredLearner = this.filterLearner(this.props.type);
    if (Array.isArray(this.state.currentView)) {
      return filteredLearner;
    }
    return filteredLearner.filter(learner => {
      if (learner.name.toLowerCase().startsWith(this.state.currentView.toLowerCase())) {
        return learner;
      }
    });
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
        return learner;
      } else if (type === undefined) {
        let searchSkill = this.props.match.params.searchSkill.replace(/search=/, '').split(',');
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
          this.state.loading ? (<div>Loading...</div>) : (<CollectionPage
                    data={this.filterByName()}
                    info={ { name: 'About Learners Guild', story: 'This is just a sentence.' } }
                    projects={this.getProjects(this.filterByName())}
                  /> )
        }
      </div>
    );
  }
}

function mapStateToProps({ learners }) {
  return { learners };
}

export default connect(mapStateToProps)(LearnerGallery);
