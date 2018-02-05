import React, { Component } from 'react';
import './index.css';
import UserBadge from '../userBadge';

export default class UserGallery extends Component {
  render() {
    return (
      <div>
        <h2 className="text-center">Learners</h2>
        <div className="learner-image-container">
          <UserBadge data={this.props.data}/>
        </div>
      </div>
    );
  }
}
