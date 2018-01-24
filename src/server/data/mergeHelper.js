const fs = require('fs');
const allLearners = [];

const buildLearners = () => {
  fs.readdir('./src/server/data/learners', 'utf8', (error, files) => {
    if (error) {
      throw error;
    }

    let count = 0;
    files.forEach((file) => {
      let data = require(`./learners/${file}`);
      data.id = count;
      count++;
      data.projects.forEach((project) => {
        project.id = count;
        count++;
      });
      data.skills.forEach((skill) => {
        skill.id = count;
        count++;
      });
      data.experience.forEach((exp) => {
        exp.id = count;
        count++;
      });
      allLearners.push(data);
    });
    return allLearners;
  });
};

buildLearners();

module.exports = allLearners;
