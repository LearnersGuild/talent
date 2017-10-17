import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import TalentNavbar from './components/talentNavbar';
import Home from './components/home';
import App from './components/app';
import NotFound from './components/notFound';
import Projects from './components/projects';

const tempInfo = [ //Until Real DB is set up
  {
    name: "Learners Guild",
    about: "About Learners Guild, it...is...AWESOME!!!!!!!!!!"
  }
]

const userTempInfo = [ //Until Real DB is set up
  {
    id: 1,
    name: "Aaron Villanueva",
    about: "Some awesome kid who is highly driven to solving problems"
  }
]

const fakeDB = [ //Until Real DB is set up
  {
    id: 1,
    name: "Aaron"
  },
  {
    id: 2,
    name: "Melissa"
  },
  {
    id: 3,
    name: "Christine"
  },
  {
    id: 4, 
    name: "Henry"
  },
  {
    id: 5,
    name: "Joe"
  },
  {
    id: 6,
    name: "Audrey"
  }
]

const fakeProjects = [ //Until Real DB is set up
  {
    title: "React Project",
    link: "https://www.google.com"
  },
  {
    title: "Postalicious",
    link: "https://www.google.com"
  },
  {
    title: "Object Oriented Programming",
    link: "https://www.google.com"
  },
  {
    title: "Functional Programming",
    link: "https://www.google.com"
  },
  {
    title: "Authentication/Authorization",
    link: "https://www.google.com"
  },
  {
    title: "",
    link: "https://www.google.com"
  }
]

ReactDOM.render(
  <div>
    <TalentNavbar/>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => 
          <Home data={fakeDB} info={tempInfo[0]} projects={fakeProjects}/>} />
        <Route path="/users/:id" component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </div>
  , document.querySelector('.container'));




