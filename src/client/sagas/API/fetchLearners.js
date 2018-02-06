import axios from 'axios';

export function fetchLearners(url) {
  return axios.get('http://localhost:3000/api/learners')
  .then(response => {
    console.log('it came in here AND response is:::', response)
    return response.data
  })
  .catch(error => {
    console.log('Error fetching and parsing data: ', error);
    throw error;
  });
}
