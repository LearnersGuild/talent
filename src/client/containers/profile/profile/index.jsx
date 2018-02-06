import React, {Component} from 'react';
import Blurb from '../../../components/blurb';
import './index.css';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.info.name}</h2>
        <div className="">
          <img className="" src="/LearnerImage.png" />
          <Blurb className="" info={this.props.info} />
        </div>
<<<<<<< HEAD
        <ul className="logo-list">
          <a href={`https://github.com/${this.props.github_handle}`} target="_blank"><li><img className="logo-list-image" src="/Logos/Github-Mark-64px.png" /></li></a>
          <a href={`https://www.linkedin.com/in/${this.props.linkedin_profile}`} target="_blank"><li><img className="logo-list-image" src="/Logos/square-linkedin-512.png" /></li></a>
          <a href={`https://www.twitter.com/${this.props.twitter}`} target="_blank"><li></li><img className="logo-list-image" src="/Logos/Twitter_Logo_Blue.png" /></a>
        </ul>
=======
        <div className="row">
          <div bsSize="large" title="Personal Contact Information" id="dropdown-size-large">
            <div href={`https://github.com/${this.props.github_handle}`} target="_blank" eventKey="1">Github</div>
            <div href={`https://www.linkedin.com/in/${this.props.linkedin_profile}`} target="_blank" eventKey="2">Linkedin</div>
            <div href={`https://www.twitter.com/${this.props.twitter}`} target="_blank" eventKey="3">Twitter</div>
          </div>
        </div>
>>>>>>> Fixed the navbar for 375 px mobile viewing and normal laptop viewing
      </div>
    );
  }
}
