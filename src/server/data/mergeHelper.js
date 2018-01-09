const fs = require('fs');
const allLearners = [];

const buildLearners = () => {
  fs.readdir('./src/server/data/learners', 'utf8', (error, files) => {
    if (error) {
      throw error;
    }
    files.forEach(file => {
      let data = require(`./learners/${file}`);
      allLearners.push(data);
    });
    return allLearners;
  });
};

buildLearners();

module.exports = allLearners;
