import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <p>Talent@LearnersGuild.com</p>
        <Link to="/home">Home Page</Link>
      </div>
    );
  }
}
