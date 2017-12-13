import React from 'react';
import { mount, configure } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Chrome } from 'navalia';
import app, { port } from '../../src/server/server.js';
import App from '../../src/client/components/app';
import reducers from '../testingEnvironment/reducers/indexHelper.js';
const pageUrl = 'http://localhost:3000/';

beforeAll(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
})

describe("Route Testing", () => {
  let chrome = {};


  beforeEach(() => {
    chrome = new Chrome();
  })

  afterEach(() => {
    return chrome.done();
  })

  it("Should render the homepage", () => {
    return chrome.goto(pageUrl)
      .then(() => chrome.exists('.navbar-nav'))
      .then((exists) => expect(exists).toEqual(true));
  })


})

afterAll(() => {
  app.close();
})




// const mountedApp = mount(
//   <Provider store={createStore(reducers)}>
//     <MemoryRouter initialEntries={['/','/alumni','/learners','/skills','/skillsresults/:searchSkill','/learners/:githubHandle']} initialIndex={0}>
//     <App />
//   </MemoryRouter>
// </Provider>,
// )
// it('Always renders current learners on the Home Page', () => {
//   expect(mountedApp.find("img").length).toEqual(7);
// })
// it('Should navigate to the Alumni Page', () => {
//   const alumniLink = mountedApp.find('.nav-item .list-group-item .alumni');
//   console.log("mountedApp:::", mountedApp.children().props());
//   alumniLink.simulate('click');
//   mountedApp.update();
//   expect(mountedApp.find("img").length).toEqual(3);
// })
