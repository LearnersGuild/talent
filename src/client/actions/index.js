import {
  FETCH_LEARNERS,
  SET_SKILLS,
  DONE_LOADING,
  SEARCH_BY_SKILL,
  SEARCH_BY_NAME
} from './types'

export function fetchLearners(allLearners) {
  return {
    type: FETCH_LEARNERS,
    payload: allLearners,
    loading: true,
  };
}

export function setSkills(allSkills) {
  return {
    type: SET_SKILLS,
    skills: allSkills,
  };
}

export function doneLoading() {
  return {
    type: DONE_LOADING,
    loading: false,
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
