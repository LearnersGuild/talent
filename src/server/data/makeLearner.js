const fs = require('fs');
const learner = {};

const makeLearner = (github, linkedin, twitter, name, story, projects, skills, experience, alumni) => {
  learner.github_handle = github;
  learner.linkedin_profile = linkedin;
  learner.twitter = twitter;
  learner.name = name;
  learner.story = story;
  learner.projects = projects;
  learner.skills = skills;
  learner.experience = experience;
  learner.alumni = alumni;
};
