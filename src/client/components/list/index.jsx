import React, { Component } from 'react';

export default class List extends Component {

  formatHeader() {
    if (this.props.type === 'projects') {
      return (this.props.type.replace('projects', 'Experience'));
    } else {
      return this.props.type.replace(this.props.type.charAt(0), this.props.type.charAt(0).toUpperCase());
    }
  }

  renderList(list) {
    return list.map(listItem => {
      return (
        <li className="list-group-item" key={listItem.id}>
          {listItem[this.props.type]}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
      <h3>{this.formatHeader()}</h3>
      <ul className="list-group">
        {this.renderList(this.props.elements)}
      </ul>
    </div>
    );
  }
}
