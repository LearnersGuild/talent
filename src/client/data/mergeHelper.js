const fs = require('fs');

const allLearners = [];

const buildLearners = () => {
  fs.readdir('./src/client/data/learners', 'utf8', (error, files) => {
    if (error) {
      throw error;
    }
    files.forEach((file, index) => {
      let data = require(`./learners/${file}`);
      allLearners.push((data));
      if (index === files.length) {
        console.log(allLearners);
        return allLearners;
      }
    });
  });
};

// buildLearners();

console.log(buildLearners());

// module.exports = allLearners;
