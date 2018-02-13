import React, { Component } from 'react';
import './index.css';
import UserGallery from './userGallery';
import Projects from '../../components/projects';

export default class CollectionPage extends Component {
  generateRandomNumber() {
    const maxNumber = this.props.projects.length - 4;
    return Math.floor(Math.random() * maxNumber);
  }

  render() {
    const slicePosition1 = this.generateRandomNumber();
    const slicePosition2 = slicePosition1 + 4;
    return (
      <div>
      <div className="flex-column-search-page">
        <UserGallery data={this.props.data}/>
      </div>
        <h2 className="text-center">Projects</h2>
        <div className="gallery-page-container">
          <div className="gallery-project-images">
            <Projects projects={this.props.projects.slice(slicePosition1, slicePosition2)} />
          </div>
        </div>
        <div className="footer-filler"></div>
      </div>
    );
  }
}
