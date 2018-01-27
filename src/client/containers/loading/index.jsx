import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLearners, doneLoading, setAlumni, setCurrentLearners } from '../../actions';
import axios from 'axios';

class Loading extends Component {

  componentDidMount() {
    axios.get('http://localhost:3000/api/learners')
    .then(response => response.data)
    .then(data => this.props.fetchLearners(data))
    .then(() => this.props.setAlumni(this.filterByType('alumni')))
    .then(() => this.props.setCurrentLearners(this.filterByType('current')))
    .then(() => this.props.doneLoading())
    .catch(error => {
      this.props.doneLoading();
      console.log('Error fetching and parsing data: ', error);
      throw error;
    });
  }

  filterByType (type) {
    return this.props.guild.allLearners.filter(learner => {
      if (type === 'alumni') {
        return learner.alumni === true;
      } else if (type === 'current') {
        return learner.alumni === false;
      }
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
  return bindActionCreators({ fetchLearners, setAlumni, setCurrentLearners, doneLoading, }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
