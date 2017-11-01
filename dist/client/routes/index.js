'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactBootstrap = require('react-bootstrap');

var _mockData = require('../../server/db/mock-data');

var _talentNavbar = require('../components/talentNavbar');

var _talentNavbar2 = _interopRequireDefault(_talentNavbar);

var _index = require('../pages/collection/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../pages/profile/index');

var _index4 = _interopRequireDefault(_index3);

var _notFound = require('../components/notFound');

var _notFound2 = _interopRequireDefault(_notFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{ component: _talentNavbar2.default,
  routes: [{ path: '/',
    exact: true,
    component: _talentNavbar2.default
  }, { path: '/learners/:githubHandle',
    component: _index4.default
  }, {
    path: '*',
    component: _notFound2.default
  }]
}];

exports.default = routes;

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