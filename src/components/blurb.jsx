import React, { Component } from 'react';

export default class Blurb extends Component {
  render() {
    console.log(this.props.data[0].title);
    return (
      <div>
        <h1 className="titleHeader">{this.props.data[0].title}</h1>
        <p>{this.props.data[0].information}</p>
      </div>
    );
  }
}
