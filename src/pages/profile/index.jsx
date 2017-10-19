import React, { Component } from 'react';

import Blurb from '../../components/blurb'
import Projects from '../../components/projects'

export default class ProfilePage extends Component {
  render() {
    return this.props.info.map(learner => {
      return (
        <div>
          <h2>{learner.name}</h2>
          <h3>{learner.about}</h3>
        </div>
        )
    })
  }
}
