import {Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {tempInfo, userTempInfo, fakeDB, fakeProjects, experience, skills} from '../../server/db/mock-data'
import TalentNavbar from '../components/talentNavbar'
import CollectionPage from '../pages/collection/index'
import ProfilePage from '../pages/profile/index'
import NotFound from '../components/notFound'

const routes = [
  { component: TalentNavbar,
    routes: [
     { path: '/',
        exact: true,
        component: TalentNavbar
      },
      { path: '/learners/:githubHandle',
        component: ProfilePage
      },
     {
       path: '*',
       component: NotFound
     }
    ]
  }
]

export default routes

// ReactDOM.render(
//   <div>
//     <TalentNavbar/>
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/" render={() =>
//           <CollectionPage data={fakeDB} info={tempInfo[0]} projects={fakeProjects}/>} />
//         <Route path="/learners/:githubHandle" render={() =>
//           <ProfilePage info={userTempInfo[0]} experience={experience} skills={skills} projects={fakeProjects}/>} />
//         <Route component={NotFound} />
//       </Switch>
//     </BrowserRouter>
//   </div>
//   , document.querySelector('.container'))
