import {takeLatest, put, all} from 'redux-saga/effects';
import axios from 'axios';

import {getCookie} from '../../utils/cookies';
import config from '../../config';
import {types as profileTypes} from '../ducks/profile';
import {types as userTypes} from '../ducks/user';

export function * watchProfile() {
  yield takeLatest(profileTypes.PROFILEUPDATE_REQUEST, onPathsInitRequest);
}

function * onPathsInitRequest({payload}) {
  try {
    const res = yield updateProfile(payload);

    yield all([
      put({
        type: userTypes.USER_SET,
        payload: res.data.user
      }),
      put({
        type: profileTypes.PROFILEUPDATE_SUCCESS,
        payload: {
          message: res.data.message
        }
      })
    ]);
  } catch (error) {
    yield put({
      type: profileTypes.PROFILEUPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function updateProfile(data) {
  return axios.put(`${config.HOST_APP}/api/v1/profile`, data, {
    headers: {
      authorization: getCookie('token')
    }
  })
    .then(res => res.data);
}
