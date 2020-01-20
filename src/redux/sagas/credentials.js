import {all, put, takeEvery} from 'redux-saga/effects';

import apiv2 from '../../services/apiv2';
import {types as credentialTypes} from '../ducks/credentials';

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
