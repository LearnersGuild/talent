import { FETCH_LEARNERS, DONE_LOADING } from '../actions/';

export default function(state = { loading: true }, action) {
  switch (action.type) {
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
