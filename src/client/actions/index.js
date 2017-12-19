export const FETCH_LEARNERS = 'fetch_learners';
export const DONE_LOADING = 'done_loading';

export function fetchLearners() {

  const allLearners = fetch('/api/learners');

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
