import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doneLoading } from '../../actions';

class Loading extends Component {
  render() {
    return (
      <div>
        {
          this.props.guild.loading ? (<div><div className="flex-center"><img className="lg-loading" src="/LearnerLogo.png" /></div><div className="footer-filler"></div></div>) : this.props.children
        }
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(Loading);
