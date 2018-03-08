import {
  DONE_LOADING,
  SET_SKILLS,
  SET_FILTER_TO_SEARCH_BY_SKILL_OR_NAME,
  FETCH_LEARNERS_SUCCESS,
  FETCH_LEARNERS_FAILURE,
  SET_FITLER_TO_ALUMNI_LEARNERS,
  SET_FILTER_TO_ALL_LEARNERS,
  SET_FILTER_TO_CURRENT_LEARNERS,
  SHOW_OPTIONS,
  HIDE_OPTIONS,
  ADVANCED_SKILL_SEARCH,
  RESET_ADVANCED_SEARCH,
  ERROR_OCCURRED
} from '../actions/types';

export default function(state = { loading: true, learners: [], advancedSkillSearch: [] }, action) {
  switch (action.type) {
    case FETCH_LEARNERS_SUCCESS:
      return { ...state, learners: action.payload };
    case SET_SKILLS:
      return { ...state, skills: action.payload };
    case FETCH_LEARNERS_FAILURE:
      return { ...state, error: action.payload };
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
    case SHOW_OPTIONS:
      return { ...state, showAdvancedSearch: action.payload };
    case HIDE_OPTIONS:
      return { ...state, showAdvancedSearch: action.payload };
    case ADVANCED_SKILL_SEARCH:
      return { ...state, advancedSkillSearch: action.payload };
    case RESET_ADVANCED_SEARCH:
      return { ...state, advancedSkillSearch: action.payload };
    case ERROR_OCCURRED:
      return { ...state, error: action.payload };
  }
  return state;
}
