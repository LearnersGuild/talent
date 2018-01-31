import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSkills } from '../../actions';
import { Link } from 'react-router-dom';
import LearnerGallery from '../../containers/learnerGallery';

class SkillsSearch extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  renderExperienceList() {
    return Object.keys(this.props.guild.skills).map((skill, index) => {
      return (
        <li className="list-group-item" key={index}>
          <label> {skill}:
            <input type="checkbox" name={skill} value={this.props.guild.skills[skill]} onChange={this.handleChange}></input>
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
        console.log(event.target.name, event.target.value);
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

  findLearners() {
    const listedState = this.props.guild.skills;
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSkills }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillsSearch);
