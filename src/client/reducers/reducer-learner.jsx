import { FETCH_LEARNERS, DONE_LOADING, START_LOADING } from '../actions/';

export default function(state = [], action) {
  switch (action.type) {
    case START_LOADING:
      return {
        loading: action.loading,
      };
    case FETCH_LEARNERS:
      return {
        learners: action.payload,
        loading: action.loading,
      };
    case DONE_LOADING:
      return {
        learners: state.learners,
        loading: action.loading,
      };
  }
  return state;
}
