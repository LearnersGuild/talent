import React, {Component} from 'react';

import UserBadge from '../userBadge';

export default class UserGallery extends Component {
  render() {
    return (
      <div>
        <h2 className="text-center">Learners</h2>
        <div className="home-page-image-container">
          <UserBadge data={this.props.data}/>
        </div>
      </div>
    );
  }
}
