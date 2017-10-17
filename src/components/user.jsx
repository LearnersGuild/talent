import React, { Component } from 'react';

import Blurb from './blurb'
import Projects from './projects'

export default class User extends Component {
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
