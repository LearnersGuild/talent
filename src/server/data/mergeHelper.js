const fs = require('fs');
const allLearners = [];

const buildLearners = () => {
  fs.readdir('./src/server/data/learners', 'utf8', (error, files) => {
    if (error) {
      throw error;
    }

    // let count = 0;
    files.forEach((file) => {
      let data = require(`./learners/${file}`);
      // data.learners.id = count;
      // count++;
      allLearners.push(data);
    });
    return allLearners;
  });
};

buildLearners();

module.exports = allLearners;
