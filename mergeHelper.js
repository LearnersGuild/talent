const fs = require('fs');

const allLearners = [];

fs.readdir('./src/client/data/learners', 'utf8', (error, files) => {
  if(error) {
    throw error;
  }
  files.forEach(file => {
    fs.readFile(`./src/client/data/learners/${file}`, 'utf8', (error, data) => {
      if(error) {
        throw error;
      }
      allLearners.push(data);
      console.log("allLearners:::", allLearners);
    })
  });
  setTimeout(() => {
    fs.writeFile('./src/client/data/index.js', `export const learners = [${allLearners}]`, (error) => {
      if(error) {
        throw error;
      }
      console.log(`This file has been updated.`);
    })
  }, 5000)

})
