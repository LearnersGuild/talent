import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class UserBadge extends Component {
  render() {
    return this.props.data.map(learner => {
      return (
          <span key={learner.id} className="col-sm-4 home-page-image">
            <Link to={`/learners/${learner.githubHandle}`}><img className="img-responsive" src="LearnerImage.png" /> </Link>
            <Link to={`/learners/${learner.githubHandle}`}><h4 className="text-center">{learner.name}</h4>
            </Link>
          </span>
      );
    });
  }
}
