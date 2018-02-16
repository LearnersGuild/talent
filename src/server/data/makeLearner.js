const fs = require('fs');

function makeLearner() {
  fs.readFile(`./public/Example Learner's Form.csv`, 'utf-8', (error, data) => {
    let learnerData = data;
    learnerData = learnerData.split('\"');
    learnerData = learnerData.splice(1);
    learnerData.pop();
    let count = 0;
    let learnerProfile = [];
    let learnerProject = [];
    let learnerSkills = [];
    let learnerExperience = [];
    let alumni = '';
    let learner = {};
    while (learnerData[0] !== '\n') {
      learnerData.shift();
    }
    for (let i = 0; i < learnerData.length; i++) {
      if (learnerData[i] === ',') {
        learnerData.splice(i, 1);
      }
    }
    learnerData.pop();
    while (learnerData.length > 0) {
      learnerData.splice(0, 2);
      if (count >= 90) {
        break;
      }
      learner['specialty'] = learnerData.shift();
      learner['github_handle'] = learnerData.shift();
      learner['linkedin_profile'] = learnerData.shift();
      learner['twitter'] = learnerData.shift();
      learner['name'] = learnerData.shift();
      learner['story'] = learnerData.shift();
      let projectsNum = learnerData.shift();
      if (projectsNum > 0) {
        learnerData.shift();
        let projects = [];
        let projectTitles = learnerData[0].split('\n');
        learnerData.shift();
        let projectLinks = learnerData[0].split('\n');
        learnerData.shift();
        for (let i = 0; i < projectsNum; i++) {
          projects.push({});
          let imageTitle = projectTitles[i].split('.')[0];
          let imageExt = projectTitles[i].split('.')[1];
          projects[i]['title'] = 'LearnerProjectImages/' + imageTitle + ' - ' + learner['name'] + '.' + imageExt;
          projects[i]['link'] = projectLinks[i];
        }
        learner['projects'] = projects;
      } else {
        learnerData.shift();
        learnerData.shift();
        learnerData.shift();
        learner['projects'] = [];
      }
      let skills = [];
      let learnerSkills = learnerData[0].split(';');
      learnerData.shift();
      for (let i = 0; i < learnerSkills.length; i++) {
        skills.push({});
        skills[i]['skills'] = learnerSkills[i];
      }
      learner['skills'] = skills;
      let experienceNum = learnerData.shift();
      if (experienceNum > 0) {
        let experiences = [];
        let learnerExperience = learnerData[0].split('\n');
        learnerData.shift();
        for (let i = 0; i < experienceNum; i++) {
          experiences.push({});
          experiences[i]['projects'] = learnerExperience[i];
        }
        learner['experience'] = experiences;
      } else {
        learnerData.shift();
        learner['experience'] = [];
      }
      let learnerName = learner['name'].replace(' ', '') + '.json';
      let alumni = learnerData.shift();
      if (alumni === 'No') {
        learner['alumni'] = false;
      } else {
        learner['alumni'] = true;
      }
      learner = JSON.stringify(learner);
      fs.writeFile(`./src/server/data/learners/${learnerName}`, learner, function (err) {
        if (err) throw err;
      });
      count++;
      learnerSkills = [];
      learnerExperience = [];
      learner = {};
    }
  });
}

makeLearner();
