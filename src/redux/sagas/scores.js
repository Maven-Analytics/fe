import {takeLatest, put, all} from 'redux-saga/effects';

import {types as scoreTypes} from '../ducks/scores';
import api from '../../services/api';

export function * watchScores() {
  yield takeLatest(scoreTypes.SCORES_GET_REQUEST, onScoresGet);
}

function * onScoresGet({payload}) {
  try {
    const scores = yield getScores(payload);

    yield all([
      put({
        type: scoreTypes.SCORES_GET_SUCCESS,
        payload: scores
      })
    ]);
  } catch (error) {
    yield put({
      type: scoreTypes.SCORES_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function getScores(params) {
  return api({
    method: 'get',
    url: '/api/v1/assessment',
    params
  });
}
