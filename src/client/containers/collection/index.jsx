import React, { Component } from 'react';
import './index.css';
import UserGallery from './userGallery';
import Projects from '../../components/projects';

export default class CollectionPage extends Component {
  generateRandomNumber() {
    const maxNumber = this.props.projects.length - 4;
    const randomNumber = Math.floor(Math.random() * maxNumber);
    return randomNumber >= 0 ? randomNumber : 0;
  }

  render() {
    const slicePosition1 = this.generateRandomNumber();
    const slicePosition2 = slicePosition1 + 4;
    return (
      <div>
      <div className="flex-column-search-page">
        <UserGallery data={this.props.data}/>
      </div>
        <div className="gallery-page-bottom-half-container">
          <div className="top-triangle-container">
            <div className="gallery-page-top-triangle" />
          </div>
          <div className="gallery-page-project-container">
            <div className="gallery-project-images">
              <Projects projects={this.props.projects.slice(slicePosition1, slicePosition2)} />
            </div>
          </div>
          <div className="bottom-triangle-container">
            <div className="gallery-page-bottom-triangle" />
          </div>
        </div>
      </div>
    );
  }
}
