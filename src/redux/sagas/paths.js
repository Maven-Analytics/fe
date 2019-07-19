import {takeLatest, put, all} from 'redux-saga/effects';

import {types as pathTypes} from '../ducks/paths';
import api from '../../services/api';

export function * watchPaths() {
  yield takeLatest(pathTypes.PATHSINIT_REQUEST, onPathsInitRequest);
}

function * onPathsInitRequest({payload}) {
  try {
    const query = payload.query || {};

    const paths = yield getPaths({query});

    yield all([
      put({
        type: pathTypes.PATHSINIT_SUCCESS,
        payload: paths
      })
    ]);
  } catch (error) {
    yield put({
      type: pathTypes.PATHSINIT_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function getPaths() {
  return api({
    method: 'get',
    url: '/api/v1/paths'
  });
}
