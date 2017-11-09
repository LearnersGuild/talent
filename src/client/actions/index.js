import { learners } from '../data/index'

export const FETCH_LEARNERS = "fetch_learners"

export default function fetchLearners() {

  return {
    type: FETCH_LEARNERS,
    payload: learners
  }
}
