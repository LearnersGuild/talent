import React, { Component } from 'react';

export default class Projects extends Component {

  render() {
    return this.props.projects.map(project => {
        return (
          <span key={project.id}>
            <a href={project.link} target="__blank" ><img src={project.title}></img></a>
          </span>
        );
      });
  }
}
