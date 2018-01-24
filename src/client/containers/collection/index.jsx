import React, { Component } from 'react';

import UserGallery from './userGallery';
import Projects from '../../components/projects';
import Blurb from '../../components/blurb';

export default class CollectionPage extends Component {
  render() {
    console.log('this.props.data ----> ', this.props.data);
    return (
      <div>
      <div className="flex-column-home-page">
        <Blurb className="col-lg-1 pagination-center" info={this.props.info} />
        <UserGallery data={this.props.data}/>
      </div>
        <h2 className="text-center">Projects</h2>
        <Projects projects={this.props.projects}/>
        <div className="footer-filler"></div>
      </div>
    );
  }
}
