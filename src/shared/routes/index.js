import React from 'react';
import { Route } from 'react-router-dom';

import TalentNavbar from '../components/talentNavbar';
import CollectionPage from '../pages/collection';
import ProfilePage from '../pages/profile';
import NotFound from '../components/notFound';
import LearnerGallery from '../components/learner-gallery'

const routes = (
  <div>
  <TalentNavbar/>
  <Route exact path="/" component={LearnerGallery}>
    <Route path="/learners/:githubHandle" component={ProfilePage} />
    <Route component={NotFound} />
  </Route>
  </div>
)

// export default class App extends Component {
//   render() {
//     return(
//       <div>
//         <TalentNavbar/>
//           <Switch>
//             <Route exact path="/" component={LearnerGallery}/>
//             <Route path="/learners/:githubHandle" component={ProfilePage} />
//             <Route component={NotFound} />
//           </Switch>
//       </div>
//     )
//   }
// }
//
// const routes = (
//   <Route path="/" component={Layout} >
//         <IndexRoute component={Index}/>
//         <Route path="/help" component={Help}/>
//         <Route path="*" component={NotFoundPage}/>
//   </Route>
// );

export default routes;
