import {takeEvery, put, all, call} from 'redux-saga/effects';

import {types as enrollmentTypes} from '../ducks/enrollments';
// Import {getAnnouncements} from '../../services/contentful';
import apiv2 from '../../services/apiv2';

export function * watchEnrollments() {
  yield takeEvery(enrollmentTypes.ENROLLMENTS_GET_REQUEST, onEnrollmentsGet);
}

function * onEnrollmentsGet({payload: {token, ...payload}}) {
  try {
    const enrollments = yield call(getEnrollments, payload, token);

    yield all([
      put({
        type: enrollmentTypes.ENROLLMENTS_GET_SUCCESS,
        payload: enrollments
      })
    ]);
  } catch (error) {
    yield put({
      type: enrollmentTypes.ENROLLMENTS_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * getEnrollments({query = {}, order = null}, token) {
  return yield apiv2({
    url: '/me/enrollments',
    params: {
      ...query,
      order
    },
    token
  });
}
