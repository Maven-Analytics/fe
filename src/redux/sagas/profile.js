import {takeLatest, put, all} from 'redux-saga/effects';
import axios from 'axios';

import {getCookie} from '../../utils/cookies';
import config from '../../config';
import {types as profileTypes} from '../ducks/profile';
import {types as userTypes} from '../ducks/user';

export function * watchProfile() {
  yield takeLatest(profileTypes.PROFILEUPDATE_REQUEST, onPathsInitRequest);
  yield takeLatest(profileTypes.PROFILE_PASSWORD_RESET_REQUEST, onPasswordResetRequest);
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

    if (payload.redirectTo) {
      window.location.href = payload.redirectTo;
    }
  } catch (error) {
    yield put({
      type: profileTypes.PROFILEUPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * onPasswordResetRequest({payload}) {
  try {
    const res = yield resetPassword(payload);

    yield all([
      put({
        type: profileTypes.PROFILE_PASSWORD_RESET_SUCCESS,
        payload: {
          message: res.data.message
        }
      })
    ]);

    if (payload.redirectTo) {
      window.location.href = payload.redirectTo;
    }
  } catch (error) {
    yield put({
      type: profileTypes.PROFILE_PASSWORD_RESET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function updateProfile(data) {
  return apiRequest('/api/v1/account/profile', data);
}

function resetPassword(data) {
  return apiRequest('/api/v1/account/password', data);
}

function apiRequest(url, data) {
  return axios.put(`${config.HOST_APP}${url}`, data, {
    headers: {
      authorization: getCookie('token')
    }
  })
    .then(res => res.data);
}
