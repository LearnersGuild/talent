import React, { Component } from 'react';
import './index.css';
import shuffle from 'lodash.shuffle';
import UserGallery from './userGallery';
import Projects from '../../components/projects';

export default class CollectionPage extends Component {
  render() {
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
              <Projects projects={shuffle(this.props.projects).slice(0, 4)} />
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
