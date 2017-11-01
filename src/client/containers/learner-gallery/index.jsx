import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';
import Profile from '../../pages/profile'
import CollectionPage from '../../pages/collection'

class LearnerGallery extends Component {

  getProjects(learners) {
    const allProjects = learners.map(learner => learner.projects)
    return _.flatMapDeep(allProjects)
  }

  render() {
    console.log( '---===this.props.learners===---', this.props.learners )
    return (
      <div>
        <CollectionPage
          data={this.props.learners}
          projects={this.getProjects(this.props.learners)}
        />
      </div>
    )
  }
}

function mapStateToProps({ learner }) {
  return { learners: learner.payload }
}

export default connect(mapStateToProps)(LearnerGallery)
