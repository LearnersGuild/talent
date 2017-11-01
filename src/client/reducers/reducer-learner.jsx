import learners, { FETCH_LEARNERS } from '../actions/index'

export default function(state = learners(), action) {
  console.log('FETCH', learners())
  switch(action.type) {
    case FETCH_LEARNERS:
      return [action.payload, ...state]
  }
  return state
}