import React from 'react';
import { mount, configure } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Blurb from '../../src/client/components/blurb';
import TalentNavbar from '../../src/client/containers/talentNavbar';
import ExperienceList from '../../src/client/components/experienceList';
import SkillList from '../../src/client/components/skillList';
import LearnerGallery from '../../src/client/containers/learnerGallery';
import ProfilePage from '../../src/client/containers/profile';
import reducers from '../testingEnvironment/reducers/indexHelper.js';
import { resetLoading } from '../testingEnvironment/actions/indexHelper.js';
import Loading from '../../src/client/containers/loading';
import ErrorBoundary from '../../src/client/components/errorBoundary';

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
  const futureProps = { params: { searchSkill: "search=JS,CSS" } };
  const mountedLearnerGallery = (type) => {
      return mount(
      <Provider store={createStore(reducers)}>
        <MemoryRouter>
          <ErrorBoundary>
            <Loading>
              <LearnerGallery type={type} match={futureProps} />
            </Loading>
          </ErrorBoundary>
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
        <MemoryRouter>
          <ErrorBoundary>
            <Loading>
              <LearnerGallery type={type} match={futureProps} />
            </Loading>
          </ErrorBoundary>
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
  describe("Searching", () => {
      it("Always renders the learners who match the search term", () => {
        const currentLearnerGallery = mountedLearnerGallery("current");
        currentLearnerGallery.find("input").simulate("change", { target: { value: "h" } });
        expect(currentLearnerGallery.find("img").length).toEqual(4);
        currentLearnerGallery.find("input").simulate("change", { target: { value: "" } });
        expect(currentLearnerGallery.find("img").length).toEqual(7);
        currentLearnerGallery.find("input").simulate("change", { target: { value: "d" } });
        expect(currentLearnerGallery.find("img").length).toEqual(0);
        currentLearnerGallery.find("input").simulate("change", { target: { value: "P" } });
        expect(currentLearnerGallery.find("img").length).toEqual(1);
      })
    })
})

describe("Profile Page", () => {
  const futureProps1 = { url: "/learners/hhhhhaaaa" };
  const futureProps2 = { url: "/learners/exercitation" };
  const futureProps3 = { url: "/learners/magna" };
  const mountedProfilePage = (profile) => {
      return mount(
      <Provider store={createStore(reducers)}>
        <MemoryRouter>
          <ErrorBoundary>
            <Loading>
              <ProfilePage match={profile} />
            </Loading>
          </ErrorBoundary>
        </MemoryRouter>
      </Provider>,
    )
  }
  it("Always matches the corresponding user", () => {
    const currentProfilePage = mountedProfilePage(futureProps1);
    expect(currentProfilePage.html()).toMatch(/hhhhhaaaa/g);
  })
  it("Always matches the corresponding user", () => {
    const currentProfilePage = mountedProfilePage(futureProps2);
    expect(currentProfilePage.html()).toMatch(/exercitation/g);
  })
  it("Always matches the corresponding user", () => {
    const currentProfilePage = mountedProfilePage(futureProps3);
    expect(currentProfilePage.html()).toMatch(/magna/g);
  })
  it("Always renders the ExperienceList and SkillList components", () => {
    const currentProfilePage = mountedProfilePage(futureProps1);
    expect(currentProfilePage.html()).toMatch(/Pro1/g);
    expect(currentProfilePage.html()).toMatch(/Pro2/g);
    expect(currentProfilePage.html()).toMatch(/JS/g);
    expect(currentProfilePage.html()).toMatch(/CSS/g);
  })
})
