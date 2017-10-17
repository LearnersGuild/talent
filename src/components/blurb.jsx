import React, { Component } from 'react';

export default class Blurb extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.info.name}</h1>
        <p>{this.props.info.about}</p>
      </div>
      ) 
  }
}
