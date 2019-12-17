import {takeLatest, put, all} from 'redux-saga/effects';

import {types as pathTypes} from '../ducks/paths';
// Import api from '../../services/api';
import apiv2 from '../../services/apiv2';

export function * watchPaths() {
  yield takeLatest(pathTypes.PATHS_GET_REQUEST, onPathsGetRequest);
}

function * onPathsGetRequest({payload}) {
  try {
    const query = payload.query || {};

    const paths = yield apiv2({
      url: '/public/paths',
      params: query
    });

    yield all([
      put({
        type: pathTypes.PATHS_GET_SUCCESS,
        payload: paths
      })
    ]);
  } catch (error) {
    yield put({
      type: pathTypes.PATHS_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
