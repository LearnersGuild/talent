import {
  DONE_LOADING,
  SET_SKILLS,
  SEARCH_BY_SKILL,
  SEARCH_BY_NAME,
  FETCH_LEARNERS_SUCCESS,
  FETCH_LEARNERS_FAILURE,
  ALUMNI_LEARNERS,
  ALL_LEARNERS,
  CURRENT_LEARNERS,
  SHOW_OPTIONS,
  HIDE_OPTIONS,
  ADVANCED_SKILL_SEARCH,
  RESET_ADVANCED_SEARCH
} from '../actions/types';

export default function(state = { loading: true, learners: [], advancedSkillSearch: [] }, action) {
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
      return { ...state, loading: action.payload };
    case SEARCH_BY_SKILL:
      return { ...state, skillSearch: action.payload, nameSearch: !action.payload };
    case SEARCH_BY_NAME:
      return { ...state, skillSearch: !action.payload, nameSearch: action.payload };
    case ALL_LEARNERS:
      return { ...state, typeOfLearners: action.payload };
    case ALUMNI_LEARNERS:
      return { ...state, typeOfLearners: action.payload };
    case CURRENT_LEARNERS:
      return { ...state, typeOfLearners: action.payload };
    case SHOW_OPTIONS:
      return { ...state, showAdvancedSearch: action.payload };
    case HIDE_OPTIONS:
      return { ...state, showAdvancedSearch: action.payload };
    case ADVANCED_SKILL_SEARCH:
      return { ...state, advancedSkillSearch: action.payload };
    case RESET_ADVANCED_SEARCH:
      return { ...state, advancedSkillSearch: action.payload };
  }
  return state;
}
