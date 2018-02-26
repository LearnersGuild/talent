import {
  FETCH_LEARNERS_REQUEST,
  SEARCH_BY_SKILL,
  SEARCH_BY_NAME,
  SET_SKILLS,
  ALL_LEARNERS,
  CURRENT_LEARNERS,
  ALUMNI_LEARNERS,
  SHOW_OPTIONS,
  HIDE_OPTIONS,
  ADVANCED_SKILL_SEARCH,
  RESET_ADVANCED_SEARCH,
  ERROR_OCCURRED,
  OPEN_CONTACT_FORM,
  CLOSE_CONTACT_FORM,
} from './types';

export function fetchLearnersRequest(url) {
  return {
    type: FETCH_LEARNERS_REQUEST,
    payload: url,
  };
}

export function searchBySkill() {
  return {
    type: SEARCH_BY_SKILL,
    payload: true,
  };
}

export function searchByName() {
  return {
    type: SEARCH_BY_NAME,
    payload: true,
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
    type: ALUMNI_LEARNERS,
    payload: 'alumni',
  };
}

export function setCurrent() {
  return {
    type: CURRENT_LEARNERS,
    payload: 'current',
  };
}

export function setAll() {
  return {
    type: ALL_LEARNERS,
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

export function openContactForm() {
  return {
    type: OPEN_CONTACT_FORM,
    payload: true,
  };
}

export function closeContactForm() {
  return {
    type: CLOSE_CONTACT_FORM,
    payload: false,
  };
}
