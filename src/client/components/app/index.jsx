import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TalentNavbar from '../../containers/talentNavbar';
import NotFound from '../notFound';
import SkillsSearch from '../skillsSearch';
import ScrollToTop from '../scrollToTop';
import ProfilePage from '../../containers/profile';
import LearnerGallery from '../../containers/learnerGallery';
import ErrorBoundary from '../errorBoundary';
import LandingPage from '../landingPage';
import Loading from '../../containers/loading';
import Footer from '../footer';
import styles from './index';

export default class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <TalentNavbar />
            <Loading>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/current" render={props => (
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
            </Loading>
          <ScrollToTop />
          <Footer />
        </ErrorBoundary>
      </div>
    );
  }
}
