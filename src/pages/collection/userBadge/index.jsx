import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class UserBadge extends Component {
  render() {
    return this.props.data.map(learner => {
      return (
        <span key={learner.id} className="col-sm-4">
          <Link to={`/learners/${learner.name}`}><img className="img-responsive" src="LearnerImage.png" /> </Link>
          <p className="text-center">{learner.name}</p>
        </span>
      );
    });
  }
}
