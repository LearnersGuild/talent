import React, { Component } from 'react';

export default class UserBadge extends Component {
  render() {
    return this.props.data.map(learner => {
      return (
        <span key={learner.id} className="col-sm-4">
          <img src="LearnerImage.png" />
          <p>{learner.name}</p>
        </span>
        )
    })
  }
}
