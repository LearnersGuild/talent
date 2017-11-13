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
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3">Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}
