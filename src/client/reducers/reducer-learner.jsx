import {
  DONE_LOADING,
  SET_SKILLS,
  SEARCH_BY_SKILL,
  SEARCH_BY_NAME,
  FETCH_LEARNERS_SUCCESS,
  FETCH_LEARNERS_FAILURE,
  ALUMNI_LEARNERS,
  ALL_LEARNERS,
  CURRENT_LEARNERS
} from '../actions/types';

export default function(state = { loading: true, learners: [] }, action) {
  switch (action.type) {
    case FETCH_LEARNERS_SUCCESS:
      return {
        learners: action.payload,
        loading: state.loading,
      };
    case SET_SKILLS:
      return {
        learners: state.learners,
        loading: state.loading,
        skills: action.payload,
        skillSearch: state.skillSearch,
        nameSearch: state.nameSearch,
        typeOfLearners: state.typeOfLearners,
      };
    case FETCH_LEARNERS_FAILURE:
      return {
        error: action.error,
      };
    case DONE_LOADING:
      return {
        learners: state.learners,
        loading: action.loading,
        skills: state.skills,
        skillSearch: state.skillSearch,
        nameSearch: state.nameSearch,
        typeOfLearners: state.typeOfLearners,
      };
    case SEARCH_BY_SKILL:
      return {
        learners: state.learners,
        loading: state.loading,
        skills: state.skills,
        skillSearch: action.payload,
        nameSearch: !action.payload,
        typeOfLearners: state.typeOfLearners,
      };
    case SEARCH_BY_NAME:
      return {
        learners: state.learners,
        loading: state.loading,
        skills: state.skills,
        skillSearch: !action.payload,
        nameSearch: action.payload,
        typeOfLearners: state.typeOfLearners,
      };
    case ALL_LEARNERS:
      return {
        learners: state.learners,
        loading: state.loading,
        skills: state.skills,
        skillSearch: !action.payload,
        nameSearch: state.payload,
        typeOfLearners: action.payload,
      };
    case ALUMNI_LEARNERS:
      return {
        learners: state.learners,
        loading: state.loading,
        skills: state.skills,
        skillSearch: !action.payload,
        nameSearch: state.payload,
        typeOfLearners: action.payload,
      };
    case CURRENT_LEARNERS:
      return {
        learners: state.learners,
        loading: state.loading,
        skills: state.skills,
        skillSearch: !action.payload,
        nameSearch: state.payload,
        typeOfLearners: action.payload,
      };
  }
  return state;
}
