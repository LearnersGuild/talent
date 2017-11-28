import { FETCH_ALUMNI_LEARNERS, FETCH_CURRENT_LEARNERS } from '../actions/';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CURRENT_LEARNERS:
      return action.payload;
    case FETCH_ALUMNI_LEARNERS:
      return action.payload;
  }
  return state;
}
