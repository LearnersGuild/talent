export const FETCH_LEARNERS = 'fetch_learners';
export const SET_ALUMNI = 'set_alumni';
export const SET_CURRENT_LEARNERS = 'set_current_learners';
export const DONE_LOADING = 'done_loading';

export function fetchLearners(allLearners) {
  return {
    type: FETCH_LEARNERS,
    payload: allLearners,
    loading: true,
  };
}

export function setAlumni(filteredLearners) {
  return {
    type: SET_ALUMNI,
    payload: filteredLearners,
    loading: true,
  };
}

export function setCurrentLearners(filteredLearners) {
  return {
    type: SET_CURRENT_LEARNERS,
    payload: filteredLearners,
    loading: true,
  };
}

export function doneLoading() {
  return {
    type: DONE_LOADING,
    loading: false,
  };
}
