import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLearners } from '../actions/index'

export class UserGallery extends Component {
  // constructor(props) {
  //   super(props);
  //   
  //   this.state = {
  //     currentLearner: ''
  //   }
  //   this.onInputChange = this.onInputChange.bind(this)
  //   this.onFormSubmit = this.onFormSubmit.bind(this)
  // }
  // 
  // onInputChange(event) {
  //   this.setState({ term: event.target.value })
  // }
  // 
  // onFormSubmit(event) {
  //   event.preventDefault();
  //   
  //   this.props.fetchLearner(this.state.currentLearner);
  //   this.setState({ currentLearner: ''})
  // }
  
  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Find a learner!"
          className="form-control"
          value={this.state.learner}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className='btn btn-secondary'> Find </button>
        </span>
      </form>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchLearner }, dispatch);
// }
// 
// function mapStateToProps({ learner }) {
//   return { learner }
// }

//export default connect(mapStateToProps)(UserGallery);