import React, { Component } from 'react';

export default class Projects extends Component {

  render() {
    return this.props.projects.map(project => {
         return (
          <div key={project.id}>
            <h4><a href={project.link}>{project.title}</a></h4>
          </div>
        );
    });
  }
}
