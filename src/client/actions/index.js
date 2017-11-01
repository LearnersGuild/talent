import { learners } from '../data/index'

export const FETCH_LEARNERS = "fetch_learners"

export default function fetchLearners() {
  console.log('what is it!!!!', learners)

  return { 
    type: FETCH_LEARNERS, 
    payload: learners
  }
}