import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchLearnersRequest } from '../../actions';
import './index.css';

class Loading extends Component {

  componentDidMount() {
    this.props.fetchLearnersRequest(`${this.props.match.path}api/learners`);
  }

  render() {
    return (
      <div>
        {
          this.props.guild.loading
            ? (<div><div className="flex-center"><img className="lg-loading" src="/LearnerLogo.png" /></div><div className="footer-filler"></div></div>)
            : this.props.children
        }
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default withRouter(connect(mapStateToProps, { fetchLearnersRequest })(Loading));
