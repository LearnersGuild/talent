import {
  FETCH_LEARNERS,
  SET_SKILLS,
  DONE_LOADING,
  SEARCH_BY_SKILL,
  SEARCH_BY_NAME
} from './types'

import {
  FETCH_LEARNERS_REQUEST
} from './types'

export function setSkills(allSkills) {
  return {
    type: SET_SKILLS,
    skills: allSkills,
  };
}

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
