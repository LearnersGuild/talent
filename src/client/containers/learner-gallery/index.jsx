import React, { Component } from 'react'
import { connect } from 'react-redux'

import Profile from '../../pages/profile'
import CollectionPage from '../../pages/collection'

class LearnerGallery extends Component {

  getProjects(learners) {
    return learners.map(learner => learner.projects)
  }

  render() {
   // console.log('learn geallery', this.props.learner.payload.filter(getProjects => getProjects.projects))
    return (
      <div>
        <CollectionPage data={this.props.learner} projects={this.getProjects(this.props.learner)}/>
      </div>
    )
  }
}

function mapStateToProps({ learner }) {
  return { learner: learner.payload }
}

export default connect(mapStateToProps)(LearnerGallery)
