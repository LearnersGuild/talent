import React, { Component } from 'react';

export default class ExperienceList extends Component {
  renderExperienceList(list) {
    return list.map(listItem => {
      return (
        <li className="list-group-item" key={listItem.id}>
          {listItem.skills}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Skills</h3>
        <ul className="list-group">
          {this.renderExperienceList(this.props.skills)}
        </ul>
      </div>
    );
  }
}
