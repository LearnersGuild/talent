import { learners } from '../data/index'

export const FETCH_ALUMNI_LEARNERS = "fetch_alumni_learners"
export const FETCH_CURRENT_LEARNERS = "fetch_current_learners"

export function fetchLearners(sortBy = 'current') {
  if (sortBy === 'alumni') {
    console.log("Alumni Called")
    return {
      type: FETCH_ALUMNI_LEARNERS,
      payload: learners.filter(learner => {
        if(learner.alumni === true) {
          return learner
        }
      })
    }
  }
  console.log("Current Called")
  return {
    type: FETCH_CURRENT_LEARNERS,
    payload: learners.filter(learner => {
      if(learner.alumni === false) {
        return learner
      }
    })
  }
}
