import { FETCH_LEARNERS } from '../actions/index';

export default function (state = [], action) {
  switch( action.type ) {
    case FETCH_LEARNERS:
      return [action.payload.data, ...state]
  }
  return state;
}