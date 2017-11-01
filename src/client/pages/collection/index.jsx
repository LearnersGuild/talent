import React, { Component } from 'react';

import UserGallery from './userGallery'
import AboutLearnersGuild from '../../components/about-learners-guild'
import Projects from '../../components/projects'

export default class CollectionPage extends Component {
  render() {
    return (
      <div>
      <div className="flex-column-home-page">
        <AboutLearnersGuild className="col-lg-1 pagination-center"/>
        <UserGallery data={this.props.data}/>
      </div>
        <h2 className="text-center">Projects</h2>
        <Projects projects={this.props.projects}/>
      </div>
    );
  }
}
