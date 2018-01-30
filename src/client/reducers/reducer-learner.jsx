import { FETCH_LEARNERS, SET_SKILLS, DONE_LOADING } from '../actions/';

export default function(state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_LEARNERS:
      return {
        learners: action.payload,
        loading: action.loading,
      };
    case SET_SKILLS:
      return {
        learners: state.learners,
        loading: state.loading,
        skills: action.skills,
      };
    case DONE_LOADING:
      return {
        learners: state.learners,
        loading: action.loading,
        skills: state.skills,
      };
  }
  return state;
}
