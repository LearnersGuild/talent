import React, { Component } from 'react';

export default class UserBadge extends Component {
  render() {
    return this.props.data.map(learner => {
      return (
        <span key={learner.id} className="col-sm-4">
          <img className="img-responsive" src="LearnerImage.png" />
          <p className="text-center">{learner.name}</p>
        </span>
      );
    });
  }
}
