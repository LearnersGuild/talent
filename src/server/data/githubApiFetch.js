const fs = require('fs');
const axios = require('axios');

function learners() {
  fs.readdir('./src/server/data/learners', 'utf8', (error, files) => {
    if (error) {
      console.log('🔥🔥error (╯°□°）╯︵ ┻━┻🔥🔥', error);
    }

    return githubApiFetch(files);
  });
}

function githubApiFetch(learners) {
  learners.forEach((file, index) => {
    let learner = require(`./learners/${file}`);
    const url = `https://api.github.com/users/${learner.github_handle}`;
    return axios.get(url)
      .then((response) => {
        const avatarUrl = response.data.avatar_url;
        learner.avatar_url = avatarUrl;
        const updatedLearner = JSON.stringify(learner, null, 2);
        try {
          fs.writeFile(`./src/server/data/learners/${learners[index]}`, updatedLearner);
        } catch (error) {
          console.log('🔥🔥ERROR!!! (╯°□°）╯︵ ┻━┻🔥🔥', error);
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data: ', error);
        throw error;
      });
  });
}

learners();
