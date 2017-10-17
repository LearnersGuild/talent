import React, { Component } from 'react';

export default class Projects extends Component {
  render() {
    return this.props.projects.map(project => {
      return (
        <div>
          <h2>{project.title}</h2>
          <h2>{project.link}</h2>
        </div>
      );
    })
  }
}
