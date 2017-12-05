import { FETCH_LEARNERS } from '../actions/';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_LEARNERS:
      return action.payload;
  }
  return state;
}
