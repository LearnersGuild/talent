import React, { Component } from 'react';

export default class ExperienceList extends Component {
  renderExperienceList(list) {
    console.log( '---===list===---', list )
    return list.map(listItem => {
      return (
        <li className="list-group-item" key={listItem.id}>
          {listItem.projects}
        </li>
      );
    });
  }

  render() {
    console.log( '---===this.props.list===---', this.props.list )
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
