import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class UserBadge extends Component {
  render() {
    return this.props.data.map(learner => {
      const profilePicture = learner.avatar_url;
      return (
        <span key={learner.id} className="learner-span">
          { profilePicture ? (
            <Link to={`/learners/${learner.github_handle}`}><img className="learner-image" src={profilePicture} alt="Profile picture" /> </Link>
          ) : (
            <Link to={`/learners/${learner.github_handle}`}><img className="learner-image" src="/LearnerImage.png" alt="Profile picture" /> </Link>
          )}
          <p className="text-center">{learner.name}</p>
        </span>
      );
    });
  }
}
