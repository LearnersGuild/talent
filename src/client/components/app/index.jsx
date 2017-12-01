import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';

import TalentNavbar from '../../components/talentNavbar';
import ProfilePage from '../../containers/profile';
import NotFound from '../../components/notFound';
import LearnerGallery from '../../components/learnerGallery'
import SkillsSearch from '../../components/skillsSearch'
import ScrollToTop from '../../components/scrollToTop';

export default class App extends Component {
  render() {
    return (
      <div>
        <TalentNavbar />
          <Switch>
            <Route exact path="/" render={props => (
              <LearnerGallery type="current" />
            )} />
            <Route exact path="/learners" render={props => (
              <LearnerGallery type="all" />
            )} />
            <Route exact path="/skillsresults/:searchSkill" component={LearnerGallery} />
            <Route exact path="/skills" component={SkillsSearch} />
            <Route exact path="/learners/:githubHandle" component={ProfilePage} />
            <Route exact path="/alumni" render={props => (
              <LearnerGallery type="alumni" />
            )} />
            <Route component={NotFound} />
          </Switch>
          <ScrollToTop />
      </div>
    );
  }
}
