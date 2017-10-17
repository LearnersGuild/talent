import React, { Component } from 'react';

export default class Blurb extends Component {
  render() {
    return (
      <div>
        <h1 className="titleHeader">{this.props.blurbAbout[0].title}</h1>
        <p>{this.props.blurbAbout[0].body}</p>
      </div>
    );
  }
}
