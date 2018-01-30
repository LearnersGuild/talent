export const FETCH_LEARNERS = 'fetch_learners';
export const SET_SKILLS = 'set_skills';
export const DONE_LOADING = 'done_loading';

export function fetchLearners(allLearners) {
  return {
    type: FETCH_LEARNERS,
    payload: allLearners,
    loading: true,
  };
}

export function setSkills(allSkills) {
  return {
    type: SET_SKILLS,
    skills: allSkills,
  };
}

export function doneLoading() {
  return {
    type: DONE_LOADING,
    loading: false,
  };
}
