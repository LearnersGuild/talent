import React from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import CollectionPage from '../../pages/collection/index';
import ProfilePage from '../../pages/profile/index';
import TalentNavbar from '../talentNavbar';
import NotFound from '../notFound';
import { tempInfo, userTempInfo, fakeDB, fakeProjects, experience, skills } from '../../../server/db/mock-data'

export default function App(props) {

  return (
    <div>
      <TalentNavbar/>
      <Switch>
        <Route exact path="/" render={() =>
          <CollectionPage data={fakeDB} info={tempInfo[0]} projects={fakeProjects}/>} />
        <Route path="/learners/:githubHandle" render={() =>
          <ProfilePage info={userTempInfo[0]} experience={experience} skills={skills} projects={fakeProjects}/>} />
        <Route exact path="/learners" render={() => <Redirect to="/" />} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}
