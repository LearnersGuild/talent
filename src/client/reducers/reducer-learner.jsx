import {
  DONE_LOADING,
  SET_SKILLS,
  SET_FILTER_TO_SEARCH_BY_SKILL_OR_NAME,
  FETCH_LEARNERS_SUCCESS,
  FETCH_LEARNERS_FAILURE,
  SET_FITLER_TO_ALUMNI_LEARNERS,
  SET_FILTER_TO_ALL_LEARNERS,
  SET_FILTER_TO_CURRENT_LEARNERS
} from '../actions/types';

export default function(state = { loading: true, learners: [] }, action) {
  switch (action.type) {
    case FETCH_LEARNERS_SUCCESS:
      return { ...state, learners: action.payload };
    case SET_SKILLS:
      return { ...state, skills: action.payload };
    case FETCH_LEARNERS_FAILURE:
      return {
        error: action.error,
      };
    case DONE_LOADING:
      return { ...state, loading: action.loading };
    case SET_FILTER_TO_SEARCH_BY_SKILL_OR_NAME:
      return { ...state, searchBySkillOrName: action.payload };
    case SET_FILTER_TO_ALL_LEARNERS:
      return { ...state, typeOfLearners: action.payload };
    case SET_FITLER_TO_ALUMNI_LEARNERS:
      return { ...state, typeOfLearners: action.payload };
    case SET_FILTER_TO_CURRENT_LEARNERS:
      return { ...state, typeOfLearners: action.payload };
  }
  return state;
}
