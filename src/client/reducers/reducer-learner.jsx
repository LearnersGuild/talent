import {
  FETCH_LEARNERS,
  DONE_LOADING,
  SET_SKILLS,
  SEARCH_BY_SKILL,
  SEARCH_BY_NAME
} from '../actions/';

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
        skillSearch: state.skillSearch,
        nameSearch: state.nameSearch,
      };
    case SEARCH_BY_SKILL:
      return {
        learners: state.learners,
        loading: state.loading,
        skillSearch: action.payload,
        nameSearch: !action.payload,
      };
    case SEARCH_BY_NAME:
      return {
        learners: state.learners,
        loading: state.loading,
        skillSearch: !action.payload,
        nameSearch: action.payload,
      };
    }
  return state;
}
