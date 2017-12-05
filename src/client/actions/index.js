import { learners } from '../data/index';

export const FETCH_LEARNERS = 'fetch_learners';

export function fetchLearners() {
  console.log('FETCH_LEARNERS Fired');
  return {
    type: FETCH_LEARNERS,
    payload: learners,
  };
}
