import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchLearners } from './API/fetchLearners'

import {
  FETCH_LEARNERS_REQUEST,
  FETCH_LEARNERS_SUCCESS,
  FETCH_LEARNERS_FAILURE
} from '../actions/types'

// take out when all action types are move to types.js
// and move to import from ../actions/types
import {
  SEARCH_BY_NAME,
  DONE_LOADING
} from '../actions'

function* fetchLearnersSaga({ payload }) {
  try {
    const learners = yield call(fetchLearners, payload);
    yield put({ type: FETCH_LEARNERS_SUCCESS, payload: learners });
    yield put({ type: SEARCH_BY_NAME, payload: true })
    yield put({ type: DONE_LOADING, loading: false })
  } catch (e) {
    yield put({ type: FETCH_LEARNERS_FAILURE, error: e.message});
  }
}

function* mySaga() {
  yield takeLatest(FETCH_LEARNERS_REQUEST, fetchLearnersSaga)
}

export default mySaga;
