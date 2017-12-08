import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LearnerGallery from '../../containers/learnerGallery'

class SkillsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = this.establishNames();
    this.handleChange = this.handleChange.bind(this);
    this.grabSkills = this.grabSkills.bind(this);
    this.filterDuplicates = this.filterDuplicates.bind(this);
    this.establishNames = this.establishNames.bind(this);
    this.findLearners = this.findLearners.bind(this);
  }

  renderExperienceList(list) {
    return this.filterDuplicates().map((skill, index) => {
      return (
        <li className="list-group-item" key={index}>
          <label> {skill}:
            <input type="checkbox" name={skill} value={this.state.skill} onChange={this.handleChange}></input>
          </label>
        </li>
      );
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value === 'on' ? target.value = 'off' : target.value = 'on';
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  establishNames() {
    const inputNames = {};
    this.filterDuplicates().forEach(skill => {
      inputNames[skill] = false;
    });
    return inputNames;
  }

  filterDuplicates() {
    const nonDuplicateSkills = [];
    this.grabSkills().forEach(skill => {
      if (nonDuplicateSkills.includes(skill)) {
        return;
      } else {
        nonDuplicateSkills.push(skill);
      }
    });
    return nonDuplicateSkills;
  }

  grabSkills() {
    const listOfSkills = [];
    this.props.guild.learners.forEach(learner => {
      return learner.skills.forEach(skill => {
        listOfSkills.push(skill.skills);
      });
    });
    return listOfSkills;
  }

  findLearners() {
    const listedState = this.state;
    const checkedSkills = [];
    for (let key in listedState) {
      if (listedState[key] === "off") {
        checkedSkills.push(key);
      }
    }
    return checkedSkills.join(',');
  }

  render() {
    return (
      <div>
        <form>
          <ul className="list-group">
            {this.renderExperienceList()}
          </ul>
          <Link to={`/skillsresults/search=${this.findLearners()}`}>
            <input ref="submitButton" type="submit" value="Submit"></input>
          </Link>
        </form>
      </div>
  );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(SkillsSearch);
