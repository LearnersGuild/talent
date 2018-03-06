import {
  FETCH_LEARNERS_REQUEST,
  SET_FILTER_TO_SEARCH_BY_SKILL_OR_NAME,
  SET_SKILLS,
  SET_FILTER_TO_ALL_LEARNERS,
  SET_FILTER_TO_CURRENT_LEARNERS,
  SET_FITLER_TO_ALUMNI_LEARNERS
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
