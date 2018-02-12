const fs = require('fs');
const learner = {};

fs.readFile(`../../../public/Example Learner's Form.csv`, 'utf-8', (error, data) => {
  let learnerData = data.split('\r');
  learnerData = learnerData.splice(1);
  learnerData.pop();
  for (let i = 0; i < learnerData.length; i++) {
    let learnerProfile = [];
    let learnerProject = [];
    let learnerSkills = [];
    let learnerExperience = [];
    learnerData[i] = learnerData[i].split(',');
    learnerData[i] = learnerData[i].splice(1);
    for (let j = 0; j < 5; j++) {
      learnerProfile.push(learnerData[i].shift());
    }

    while (true) {
      console.log(learnerData[i]);
      if (learnerData[i][0].includes('\"')) {
        learnerProject.push(learnerData[i].shift());
        break;
      }

      learnerProject.push(learnerData[i].shift());
    }

    console.log(learnerData);
  }
});
