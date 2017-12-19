import { learners } from '../data';

export const FETCH_LEARNERS = 'fetch_learners';
export const DONE_LOADING = 'done_loading';

export function fetchLearners() {
  return {
    type: FETCH_LEARNERS,
    payload: learners,
    loading: true,
  };
}

export function doneLoading() {
  return {
    type: DONE_LOADING,
    loading: false,
  };
}
