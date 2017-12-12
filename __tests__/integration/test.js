import React from 'react';
import { mount, configure } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Blurb from '../../src/client/components/blurb';
import TalentNavbar from '../../src/client/components/talentNavbar';
import LearnerGallery from '../../src/client/containers/learnerGallery';
import CollectionPage from '../../src/client/containers/collection';
import reducers from '../testingEnvironment/reducers/indexHelper.js';
import { resetLoading } from '../testingEnvironment/actions/indexHelper.js';

describe("Blurb", () => {
  let info = {
    name: "Jill",
    story: "This is about Jill. Cool."
  }
  const mountedBlurb = mount(
    <Blurb info={info} />
  )
  it("Always renders a div", () => {
    const div = mountedBlurb.find("div");
    expect(div.length).toBeGreaterThan(0);
  })
  it("Always renders a h1", () => {
    const h1 = mountedBlurb.find("h1");
    expect(h1.length).toBeGreaterThan(0);
  })
  it("Always renders a p", () => {
    const p = mountedBlurb.find("p");
    expect(p.length).toBeGreaterThan(0);
  })
  it("Can be passed an info prop", () => {
    const blurbProps = mountedBlurb.props();
    expect(blurbProps.info.name).toEqual("Jill");
    expect(blurbProps.info.story).toEqual("This is about Jill. Cool.");
  })
})

describe("LearnerGallery", () => {
  const futureProps = { params: { searchSkill: "search=JS,CSS"} };
  const mountedLearnerGallery = (type) => {
      return mount(
      <Provider store={createStore(reducers)}>
        <MemoryRouter initialEntries={["skillsresultssearch=JS,CSS"]}>
          <div>
            <TalentNavbar />
              <LearnerGallery type={type} match={futureProps} />
          </div>
        </MemoryRouter>
      </Provider>,
    )
  }
  describe("Route-Changes", () => {
    it("Always renders Current Learners when at Home Route", () => {
      const currentLearnerGallery = mountedLearnerGallery("current");
      expect(currentLearnerGallery.find("img").length).toEqual(7);
    })
    it("Always renders Alumni Learners when at Alumni Route", () => {
      const currentLearnerGallery = mountedLearnerGallery("alumni");
      expect(currentLearnerGallery.find("img").length).toEqual(3);
    })
    it("Always renders All Learners when at Learners Route", () => {
      const currentLearnerGallery = mountedLearnerGallery("all");
      expect(currentLearnerGallery.find("img").length).toEqual(10);
    })
    it("Always renders Learners with specific skills when at Skills Results Route", () => {
      const currentLearnerGallery = mountedLearnerGallery();
      expect(currentLearnerGallery.find("img").length).toEqual(9);
    })
  })
  const sortaMountedLearnerGallery = (type, mockStore) => {
      return mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["skillsresultssearch=JS,CSS"]}>
          <div>
            <TalentNavbar />
              <LearnerGallery type={type} match={futureProps} />
          </div>
        </MemoryRouter>
      </Provider>,
    )
  }
  describe("Loading", () => {
    it("Always renders a loading spinner if the Redux Store is set to loading", () => {
      const storeCreate = createStore(reducers);
      const currentLearnerGallery = sortaMountedLearnerGallery("current", storeCreate);
      storeCreate.dispatch(resetLoading());
      currentLearnerGallery.update();
      expect(currentLearnerGallery.find("img").length).toEqual(1);
    })
  })
})

describe("Profile Page", () => {
  
})
