import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import TalentNavbar from '../../components/talentNavbar';
import CollectionPage from '../../containers/collection';
import ProfilePage from '../../containers/profile';
import NotFound from '../../components/notFound';
import LearnerGallery from '../../components/learner-gallery'

export default class App extends Component {
  render() {
    return(
      <div>
        <TalentNavbar/>
          <Switch>
            <Route exact path="/" component={LearnerGallery}/>
            <Route path="/learners/:githubHandle" component={ProfilePage} />
            <Route component={NotFound} />
          </Switch>
      </div>
    )
  }
}
