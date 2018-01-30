import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LearnerGallery from '../../containers/learnerGallery';

class SkillsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = this.establishSkills();
    this.handleChange = this.handleChange.bind(this);
  }

  renderExperienceList() {
    return this.props.guild.skills.map((skill, index) => {
      return (
        <li className="list-group-item" key={index}>
          <label> {skill}:
            <input type="checkbox" name={skill} value={this.state[skill]} onChange={this.handleChange}></input>
          </label>
        </li>
      );
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value === 'on' ? 'off' : 'on';
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  establishSkills() {
    const skillNames = {};
    this.props.guild.skills.map(skill => {
      skillNames[skill] = 'off';
    });
    return skillNames;
  }

  findLearners() {
    const listedState = this.state;
    const checkedSkills = [];
    for (let key in listedState) {
      if (listedState[key] === 'on') {
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
        <div className="footer-filler"></div>
      </div>
  );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps)(SkillsSearch);
