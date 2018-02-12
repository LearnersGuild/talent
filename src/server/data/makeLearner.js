const fs = require('fs');

function makeLearner() {
  fs.readFile(`../../../public/Example Learner's Form.csv`, 'utf-8', (error, data) => {
    let learnerData = data.replace(/\"/g, '');
    learnerData = learnerData.split('\n');
    learnerData = learnerData.splice(1);
    learnerData.pop();
    let count = 0;
    let learnerProfile = [];
    let learnerProject = [];
    let learnerSkills = [];
    let learnerExperience = [];
    let learner = {};
    while (learnerData.length > 0) {
      let currentData = learnerData[0].split(',');
      currentData.shift();
      if (count >= 90) {
        break;
      }
      if (currentData[0][1] === '2' && currentData[0][5] === '/') {
        currentData.shift();
      }
      for (let i = 0; i < 5; i++) {
        learnerProfile.push(currentData.shift());
      }
      let projectsNum = currentData[0];
      currentData.shift();
      for (let i = 0; i < 3 * (projectsNum); i++) {
        if (currentData[0] === undefined) {
          learnerData.shift();
          currentData = learnerData[0].split(',');
        }
        if (currentData[0].includes(';')) {
          let tempData = currentData[0].split(';');
          learnerProject.push(tempData);
          i += projectsNum;
          currentData.shift();
          break;
        } else {
          learnerProject.push(currentData.shift());
        }
      }
      learnerSkills = currentData[0].split(';');
      currentData.shift();
      let experienceNum = currentData[0];
      currentData.shift();
      for (let i = 0; i < experienceNum; i++) {
        if (currentData[0] === undefined) {
          learnerData.shift();
          currentData = learnerData[0].split(',');
        }
        learnerExperience.push(currentData.shift());
      }
      learner['github_handle'] = learnerProfile[0];
      learner['linkedin_profile'] = learnerProfile[1];
      learner['twitter'] = learnerProfile[2];
      learner['name'] = learnerProfile[3];
      learner['story'] = learnerProfile[4];
      let projects = [];
      for (let i = 0; i < projectsNum; i++) {
        projects.push({});
        projects[i]['title'] = learnerProject[i];
        projects[i]['link'] = learnerProject[projectsNum][i];
      }
      learner['projects'] = projects;
      let skills = [];
      for (let i = 0; i < learnerSkills.length; i++) {
        skills.push({});
        skills[i]['skills'] = learnerSkills[i];
      }
      learner['skills'] = skills;
      let experiences = [];
      for (let i = 0; i < experienceNum; i++) {
        experiences.push({});
        experiences[i]['projects'] = learnerExperience[i];
      }
      learner['experience'] = experiences;
      learner['alumni'] = false;
      let learnerName = learnerProfile[3].replace(' ', '') + '.json';
      learner = JSON.stringify(learner);
      fs.writeFile(learnerName, learner, function (err) {
        if (err) throw err;
        console.log(learner);
      });
      count++;
      console.log(learnerProfile, learnerProject, learnerSkills, learnerExperience);
      learnerProfile = [];
      learnerProject = [];
      learnerSkills = [];
      learnerExperience = [];
      learner = {};
      learnerData.shift();
    }
  });
}

makeLearner();
