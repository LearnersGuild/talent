import { learners } from '../data/index'

export const FETCH_LEARNERS = 'fetch_learners';

export function fetchLearners() {
  console.log('db Called');
  return {
    type: FETCH_LEARNERS,
    payload: learners,
  };
}
