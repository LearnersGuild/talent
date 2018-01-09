import React, { Component } from 'react';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="flex-center">
        <div className="about"></div>
        <div className="about-title">TALENT</div>
        <div className="about-image-container"></div>
        <div className="about-text">
          <h2 className="about-text-title">WHO WE ARE</h2>
          <p>Learners Guild is a 10 month experience that is open to anyone who wishes to make a start as a web developer. Both the Guild and the Learners themselves endeavor to find the best way to push the Learner's skills and experience forward, through many facets. Self-guided and staff-guided learning both are encouraged, with individual and team based projects, numerous online instructional videos, and one-on-one support meetings. The culture is something to behold, a beacon that each Learner can use to depend on, even past their time at the Guild. Overall, it strives to move the tech industry further by creating a wonderful opportunity for all its Learners to learn, find jobs, and be a rock in the ocean that is tech.</p>
        </div>
        <div className="teal-triangle1"></div>
        <div className="project-image-container"></div>
        <div className="engineers"></div>
        <div className="teal-triangle2"></div>
      </div>
    );
  }
}
