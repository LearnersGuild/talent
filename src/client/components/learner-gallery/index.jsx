import React, { Component } from 'react'
import { connect } from 'react-redux'
import CollectionPage from '../../containers/collection'
import _ from 'lodash'

class LearnerGallery extends Component {

  getProjects(learners) {
    const allProjects = learners.map(learner => learner.projects)
    return _.flatMapDeep(allProjects)
  }

  render() {
    return (
      <div>
        <CollectionPage
          data={this.props.learners}
          info={ {name: "About Learners Guild", story: "This is just a sentence."} }
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
