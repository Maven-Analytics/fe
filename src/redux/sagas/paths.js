import {takeLatest, put, call, all} from 'redux-saga/effects';

import {types as pathTypes} from '../ducks/paths';
import {getPaths} from '../../services/contentful';

export function * watchPaths() {
  yield takeLatest(pathTypes.PATHSINIT_REQUEST, onPathsInitRequest);
}

function * onPathsInitRequest({payload}) {
  try {
    const query = {};

    if (payload.query && payload.query.slug) {
      query['fields.slug'] = payload.query.slug;
    }

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
