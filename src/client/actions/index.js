import {
  FETCH_LEARNERS_REQUEST,
  SEARCH_BY_SKILL,
  SEARCH_BY_NAME,
  SET_SKILLS,
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
