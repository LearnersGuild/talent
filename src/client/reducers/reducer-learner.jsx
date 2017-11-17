import { fetchLearners, FETCH_ALUMNI_LEARNERS, FETCH_CURRENT_LEARNERS } from '../actions/'

export default function(state = fetchLearners(), action) {
  switch(action.type) {
    case FETCH_CURRENT_LEARNERS:
      return [action.payload, ...state]
    case FETCH_ALUMNI_LEARNERS:
      return [action.payload, ...state]
  }
  return state
}
