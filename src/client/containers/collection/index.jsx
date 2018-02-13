import React, { Component } from 'react';
import './index.css';
import UserGallery from './userGallery';
import Projects from '../../components/projects';

export default class CollectionPage extends Component {
  makeProjectRows() {
    let projectRows = [];
    for (let i = 0; i < this.props.projects.length; i += 4) {
      projectRows.push(this.props.projects.slice(i, i + 4));
    }

    return projectRows;
  }

  renderProjects() {
    const projectRows = this.makeProjectRows();
    return projectRows.map((row, index) => {
      return (
        <div className="gallery-project-images" key={index} >
          <Projects projects={row} />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
      <div className="flex-column-search-page">
        <UserGallery data={this.props.data}/>
      </div>
        <h2 className="text-center">Projects</h2>
        <div className="gallery-page-container">
          { this.renderProjects() }
        </div>
        <div className="footer-filler"></div>
      </div>
    );
  }
}
