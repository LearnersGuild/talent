import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLearners, doneLoading } from '../../actions';
import axios from 'axios';

class Loading extends Component {

  componentDidMount() {
    axios.get('http://localhost:3000/api/learners')
    .then(response => response.data)
    .then(data => this.props.fetchLearners(data))
    .then(() => this.props.doneLoading())
    .catch(error => {
      this.props.doneLoading();
      console.log('Error fetching and parsing data: ', error);
      throw error;
    });
  }

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLearners, doneLoading, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
