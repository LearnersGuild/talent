import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSkills, advancedSkillSearch } from '../../actions';
import './index.css';

class SkillsSearch extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.findLearners = this.findLearners.bind(this);
    this.resetSkills();
  }

  renderExperienceList() {
    return Object.keys(this.props.guild.skills).map((skill, index) => {
      return (
        <li className="list-group-item" key={index}>
          <label className="list-group-item-label" >{skill}:&nbsp;
            <input type="checkbox" name={skill} value={this.props.guild.skills[skill]} onChange={this.handleChange}></input>&nbsp;&nbsp;
          </label>
        </li>
      );
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value === 'on' ? 'off' : 'on';
    const name = target.name;
    const skills = this.props.guild.skills;
    let newSkills = {};
    Object.keys(skills).map((skill, index) => {
      if (skill === name) {
        if (skills[skill] === 'off') {
          newSkills[`${skill}`] = 'on';
        } else {
          newSkills[`${skill}`] = 'off';
        }
      } else {
        newSkills[`${skill}`] = skills[skill];
      }
    });
    this.props.setSkills(newSkills);
  }

  resetSkills() {
    const skills = this.props.guild.skills;
    let newSkills = {};
    Object.keys(skills).map((skill, index) => {
      newSkills[`${skill}`] = 'off';
    });
    this.props.setSkills(newSkills);
  }

  findLearners(event) {
    event.preventDefault();
    const listedState = this.props.guild.skills;
    const checkedSkills = [];
    for (let key in listedState) {
      if (listedState[key] === 'on') {
        checkedSkills.push(key);
      }
    }

    this.props.advancedSkillSearch(checkedSkills);
  }

  render() {
    return (
      <div className="advsearch-form-container">
        <form className="advsearch-form" onSubmit={this.findLearners}>
          <ul className="advsearch-form-list">
            {this.renderExperienceList()}
          </ul>
          <input className="advsearch-submit-button" type="submit" value="Submit"></input>
        </form>
      </div>
  );
  }
}

function mapStateToProps({ guild }) {
  return { guild };
}

export default connect(mapStateToProps, { setSkills, advancedSkillSearch })(SkillsSearch);
