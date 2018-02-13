import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchLearners } from './API/fetchLearners';

import {
  FETCH_LEARNERS_REQUEST,
  FETCH_LEARNERS_SUCCESS,
  FETCH_LEARNERS_FAILURE,
  SET_SKILLS,
  SEARCH_BY_SKILL,
  DONE_LOADING,
} from '../actions/types';

function* fetchLearnersSaga({ payload }) {
  try {
    const learners = yield call(fetchLearners, payload);
    const allSkills = processSkills(learners);
    yield put({ type: FETCH_LEARNERS_SUCCESS, payload: learners });
    yield put({ type: SEARCH_BY_SKILL, payload: true });
    yield put({ type: SET_SKILLS, payload: allSkills });
    yield put({ type: DONE_LOADING, loading: false });
  } catch (e) {
    yield put({ type: FETCH_LEARNERS_FAILURE, error: e.message });
  }
}

function processSkills(learners) {
  return establishNames(learners);
}

function establishNames(learners) {
  const inputNames = filterDuplicates(learners).map(skill => skill);
  let tempObj = {};
  let objectNames = inputNames.map((skill, index) => {
    tempObj[`${skill}`] = 'off';
    return tempObj;
  });
  return tempObj;
}

function filterDuplicates(learners) {
  const uniqueSkills = [];
  grabSkills(learners).forEach(skill => {
    if (uniqueSkills.includes(skill)) {
      return;
    } else {
      uniqueSkills.push(skill);
    }
  });
  return uniqueSkills;
}

function grabSkills(learners) {
  const listOfSkills = [];
  learners.forEach(learner => {
    return learner.skills.forEach(skill => {
      listOfSkills.push(skill.skills);
    });
  });
  return listOfSkills;
}

function* mySaga() {
  yield takeLatest(FETCH_LEARNERS_REQUEST, fetchLearnersSaga);
}

export default mySaga;
