import React, { Component } from 'react';

import Learners from './learners'
import Blurb from './blurb'
import Projects from './projects'

export default class Home extends Component {
  render() {
    return (
      <div>
        <p> Welcome Home! </p>
        <Blurb info={this.props.info}/>
        <Learners data={this.props.data}/>
        <Projects projects={this.props.projects}/>
      </div>
    );
  }
}
