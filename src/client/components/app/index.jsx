import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import TalentNavbar from '../../components/talentNavbar';
import CollectionPage from '../../pages/collection';
import ProfilePage from '../../pages/profile';
import NotFound from '../../components/notFound';
import LearnerGallery from '../../containers/learner-gallery'

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
