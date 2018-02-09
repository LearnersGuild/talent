import axios from 'axios';

export function fetchLearners(url) {
  return axios.get(url)
  .then(response => {
    return response.data
  })
  .catch(error => {
    console.log('Error fetching and parsing data: ', error);
    throw error;
  });
}
