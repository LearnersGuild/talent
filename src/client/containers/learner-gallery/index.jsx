import React, { Component } from 'react'
import { connect } from 'react-redux'

import Profile from '../../pages/profile'
import CollectionPage from '../../pages/collection'

class LearnerGallery extends Component {

  render() {
    console.log('what is the props', this.props)
    return (
      <div>
        <CollectionPage data={this.props.learner.payload} projects={this.props.learner.payload.filter(learner => learner.projects)}/>
      </div>
    )
  }
}

function mapStateToProps({ learner }) {
  return { learner }
}

export default connect(mapStateToProps)(LearnerGallery)