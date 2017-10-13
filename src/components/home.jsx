import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <p> Welcome Home! </p>
        <Link to="/">App Page</Link>
      </div>
    );
  }
}
