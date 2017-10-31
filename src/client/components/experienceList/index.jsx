import React, { Component } from 'react';
import _ from 'lodash';

export default class ExperienceList extends Component {
  renderExperienceList(list) {
    return _.map(list, listItem => {
      return (
        <li className="list-group-item" key={listItem.id}>
          {listItem.projects}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Experience</h3>
        <ul className="list-group">
          {this.renderExperienceList(this.props.list)}
        </ul>
      </div>
    );
  }
}
