import {
  FETCH_LEARNERS_REQUEST,
  SET_FILTER_TO_SEARCH_BY_SKILL_OR_NAME,
  SET_SKILLS,
  SET_FILTER_TO_ALL_LEARNERS,
  SET_FILTER_TO_CURRENT_LEARNERS,
  SET_FITLER_TO_ALUMNI_LEARNERS,
  SHOW_OPTIONS,
  HIDE_OPTIONS,
  ADVANCED_SKILL_SEARCH,
  RESET_ADVANCED_SEARCH,
  ERROR_OCCURRED
} from './types';

export function fetchLearnersRequest(url) {
  return {
    type: FETCH_LEARNERS_REQUEST,
    payload: url,
  };
}

export function searchBySkillOrName(value) {
  return {
    type: SET_FILTER_TO_SEARCH_BY_SKILL_OR_NAME,
    payload: value,
  };
}

export function setSkills(skills) {
  return {
    type: SET_SKILLS,
    payload: skills,
  };
}

export function setAlumni() {
  return {
    type: SET_FITLER_TO_ALUMNI_LEARNERS,
    payload: 'alumni',
  };
}

export function setCurrent() {
  return {
    type: SET_FILTER_TO_CURRENT_LEARNERS,
    payload: 'current',
  };
}

export function setAll() {
  return {
    type: SET_FILTER_TO_ALL_LEARNERS,
    payload: 'all',
  };
}

export function showOptions() {
  return {
    type: SHOW_OPTIONS,
    payload: true,
  };
}

export function hideOptions() {
  return {
    type: HIDE_OPTIONS,
    payload: false,
  };
}

export function advancedSkillSearch(advSkills) {
  return {
    type: ADVANCED_SKILL_SEARCH,
    payload: advSkills,
  };
}

export function resetAdvancedSearch() {
  return {
    type: RESET_ADVANCED_SEARCH,
    payload: [],
  };
}

export function errorOccurred(error) {
  return {
    type: ERROR_OCCURRED,
    payload: error,
  };
}
