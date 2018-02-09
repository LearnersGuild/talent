const fs = require('fs');
const learner = {};

const makeLearner = () => {
  learner.github_handle = 'blah';
  learner.linkedin_profile = 'more blah';
  learner.twitter = 'most blah';
  learner.name = 'name blah';
  learner.story = 'story blah';
  learner.projects = [{
    'title': 'title blah',
    "link": "blah"
  }];
  learner.skills = [];
  learner.experience = [];
  learner.alumni = false;
};
