const fs = require('fs');
const axios = require('axios');

function githubApiFetch(learners) {
  learners.forEach((file) => {
    let learner = require(`./learners/${file}`);
    const url = `https://api.github.com/users/${learner.github_handle}`;
    const githubResponse = getGithubAvatar(url);
    const avatarUrl = githubResponse.avatar_url;
    learner.avatar_url = avatarUrl;
    const updatedLearner = JSON.stringify(learner);
    try {
      fs.writeFile(`./src/server/data/learners/${learner}`, updatedLearner)
    } catch(error) {
      console.log("🔥🔥ERROR!!! (╯°□°）╯︵ ┻━┻🔥🔥", error)
    }
  })
}

function getGithubAvatar(url) {
  return axios.get(url)
    .then((response) => {
      console.log("🔥🔥response.data (╯°□°）╯︵ ┻━┻🔥🔥", response.data)
      return response.data;
    })
    .catch((error) => {
      console.log('Error fetching and parsing data: ', error);
      throw error;
    });
}
