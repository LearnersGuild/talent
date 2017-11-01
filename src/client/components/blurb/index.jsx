import React, { Component } from 'react';

export default class Blurb extends Component {
  render() {
    return (
      <div className="text-center">
        <h1>{this.props.info.name}</h1>
        <p>{this.props.info.story}</p>
      </div>
    );
  }
}
