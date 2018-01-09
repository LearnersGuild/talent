import React, { Component } from 'react';
const fs = require('fs');

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      hasError: false,
    });
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });

    console.error(error, info);
    // fs.writeFile('errorLogging.txt', error, (err) => {
    //   if (err) {
    //     throw error;
    //   }
    //
    //   console.log('Error logged.');
    // });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
