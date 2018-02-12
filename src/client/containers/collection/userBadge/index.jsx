import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class UserBadge extends Component {
  render() {
    return this.props.data.map(learner => {
      return (
        <span key={learner.id} className="learner-span">
          <Link to={`/learners/${learner.github_handle}`}><img className="learner-image" src="/LearnerImage.png" /> </Link>
          <p className="text-center">{learner.name}</p>
        </span>
      );
    });
  }
}
