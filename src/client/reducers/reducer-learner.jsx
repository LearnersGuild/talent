import {
  DONE_LOADING,
  SET_SKILLS,
  SEARCH_BY_SKILL,
  SEARCH_BY_NAME
} from '../actions/types';

import {
  FETCH_LEARNERS_SUCCESS,
  FETCH_LEARNERS_FAILURE
} from '../actions/types'

export default function(state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_LEARNERS_SUCCESS:
      return {
        learners: action.payload,
        loading: action.loading,
      };
<<<<<<< HEAD
    case SET_SKILLS:
      return {
        learners: state.learners,
        loading: state.loading,
        skills: action.skills,
=======
    case FETCH_LEARNERS_FAILURE:
      return {
        error: action.error
>>>>>>> add request success and failure states to reducer
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
