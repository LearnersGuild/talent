export const FETCH_LEARNERS = 'fetch_learners';
export const DONE_LOADING = 'done_loading';
export const SEARCH_BY_SKILL = 'search_by_skill';
export const SEARCH_BY_NAME = 'search_by_name';

export function fetchLearners(allLearners) {
  return {
    type: FETCH_LEARNERS,
    payload: allLearners,
    loading: true,
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
