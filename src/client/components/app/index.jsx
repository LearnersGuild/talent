import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import css from '../../../../public/index.scss'

import TalentNavbar from '../../components/talentNavbar';
import CollectionPage from '../../pages/collection';
import ProfilePage from '../../pages/profile';
import NotFound from '../../components/notFound';
import LearnerGallery from '../../containers/learner-gallery'

class App extends Component {
  render() {
    return(
      <div>
        <TalentNavbar/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LearnerGallery}/>
            <Route path="/learners/:githubHandle" component={ProfilePage} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
