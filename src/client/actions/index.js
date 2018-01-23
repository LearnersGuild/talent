export const START_LOADING = 'start_loading';
export const FETCH_LEARNERS = 'fetch_learners';
export const DONE_LOADING = 'done_loading';

export function startLoading() {
  return {
    type: START_LOADING,
    loading: true,
  };
}

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
