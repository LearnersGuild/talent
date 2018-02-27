import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorOccurred } from '../../actions';

class ErrorBoundary extends Component {
  componentDidCatch(error, info) {
    this.props.errorOccurred(error);
    console.error(error, info);
  }

  render() {
    return this.props.guild.error ? (
      <img src="https://c1.staticflickr.com/8/7001/6509400855_aaaf915871_b.jpg" />
    ) : (
      this.props.children
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps, { errorOccurred })(ErrorBoundary);
