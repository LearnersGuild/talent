import { fetchLearners, FETCH_LEARNERS } from '../actions/';

export default function(state = fetchLearners(), action) {
  switch (action.type) {
    case FETCH_LEARNERS:
      return action.payload;
  }
  return state.payload;
}
