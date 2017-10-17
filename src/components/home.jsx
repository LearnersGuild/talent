import React, { Component } from 'react';

import UserBadge from './userBadge'
import Blurb from './blurb'
import Projects from './projects'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Blurb className="col-lg-1" info={this.props.info}/>
        <UserBadge data={this.props.data}/>
        <Projects projects={this.props.projects}/>
      </div>
    );
  }
}
