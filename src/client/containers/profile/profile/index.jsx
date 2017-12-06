import React, {Component} from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import Blurb from '../../../components/blurb';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport([transport[, defaults]]);

export default class Profile extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.info.name}</h2>
        <div className="row">
          <img className="img-responsive col-sm-5" src="/LearnerImage.png" />
          <Blurb className="col-sm-4" info={this.props.info} />
        </div>
        <ButtonToolbar className="row">
          <DropdownButton bsSize="large" title="Personal Contact Information" id="dropdown-size-large">
            <MenuItem href={`https://github.com/${this.props.github_handle}`} target="_blank" eventKey="1">Github</MenuItem>
            <MenuItem href={`https://www.linkedin.com/in/${this.props.linkedin_profile}`} target="_blank" eventKey="2">Linkedin</MenuItem>
            <MenuItem href={`https://www.twitter.com/${this.props.twitter}`} target="_blank" eventKey="3">Twitter</MenuItem>
            <MenuItem eventKey="4">Email</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}
