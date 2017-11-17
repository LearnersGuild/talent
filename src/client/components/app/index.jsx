import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';

import TalentNavbar from '../../components/talentNavbar';
import ProfilePage from '../../containers/profile';
import NotFound from '../../components/notFound';
import LearnerGallery from '../../components/learner-gallery'

export default class App extends Component {
  render() {
    return(
      <div>
        <TalentNavbar/>
          <Switch>
            <Route exact path="/" component={LearnerGallery} />
            <Route path="/learners/:githubHandle" component={ProfilePage} />
            <Route path="/alumni" component={LearnerGallery} />
            <Route component={NotFound} />
          </Switch>
      </div>
    )
  }
}
