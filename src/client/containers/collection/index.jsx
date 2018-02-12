import React, { Component } from 'react';
import './index.css';
import UserGallery from './userGallery';
import Projects from '../../components/projects';
import Blurb from '../../components/blurb';

export default class CollectionPage extends Component {
  render() {
    return (
      <div>
      <div className="flex-column-search-page">
        <Blurb className="" info={this.props.info} />
        <UserGallery data={this.props.data}/>
      </div>
        <h2 className="text-center">Projects</h2>
        <Projects projects={this.props.projects}/>
        <div className="footer-filler"></div>
      </div>
    );
  }
}
