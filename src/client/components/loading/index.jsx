import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doneLoading } from '../../actions';
import { bindActionCreators } from 'redux';

class Loading extends Component {
  componentDidMount() {
    this.props.doneLoading();
  }

  render() {
    return (
      <div>
        {
          this.props.guild.loading ? (<div className="flex-center"><img className="lg-loading" src="/LearnerLogo.png" /></div>) : this.props.children
        }
      </div>
    );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doneLoading }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
