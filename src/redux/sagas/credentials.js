import {takeEvery, put, all} from 'redux-saga/effects';

import {types as credentialTypes} from '../ducks/credentials';
import apiv2 from '../../services/apiv2';

export function * watchCredentials() {
  yield takeEvery(credentialTypes.CREDENTIALS_GET_REQUEST, onCredentialsGet);
}

function * onCredentialsGet({payload}) {
  try {
    const query = payload.query || {};

    const credentials = yield apiv2({
      url: '/me/credentials',
      params: query
    });

    yield all([
      put({
        type: credentialTypes.CREDENTIALS_GET_SUCCESS,
        payload: credentials
      })
    ]);
  } catch (error) {
    yield put({
      type: credentialTypes.CREDENTIALS_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
