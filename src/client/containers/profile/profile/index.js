import React, {Component} from 'react';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import Blurb from '../../../components/blurb';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.info.name}</h2>
        <div className="row">
          <img className="img-responsive col-sm-5" src="../../LearnerImage.png" />
          <Blurb className="col-sm-4" info={this.props.info} />
        </div>
        <ButtonToolbar className="row">
          <DropdownButton bsSize="large" title="Personal Contact Information" id="dropdown-size-large">
            <MenuItem href={`https://github.com/${this.props.github_handle}`} target="_blank" eventKey="1">Github</MenuItem>
            <MenuItem eventKey="2">Linkedin</MenuItem>
            <MenuItem eventKey="3">Twitter</MenuItem>
            <MenuItem eventKey="4">Email</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}
