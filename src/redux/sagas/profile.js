import {takeLatest, put, all, call} from 'redux-saga/effects';
// Import axios from 'axios';

import {getCookie} from '../../utils/cookies';
import config from '../../config';
import {types as profileTypes} from '../ducks/profile';
import {types as userTypes} from '../ducks/user';
import {checkRedirect} from './redirect';
import api from '../../services/api';

export function * watchProfile() {
  yield takeLatest(profileTypes.PROFILEUPDATE_REQUEST, profileUpdateRequest);
  yield takeLatest(profileTypes.PROFILE_PASSWORD_RESET_REQUEST, onPasswordResetRequest);
}

function * profileUpdateRequest({payload}) {
  try {
    const res = yield updateProfile(payload);

    yield all([
      put({
        type: userTypes.USER_SET,
        payload: res.user
      }),
      put({
        type: profileTypes.PROFILEUPDATE_SUCCESS,
        payload: {
          message: res.message
        }
      })
    ]);

    yield call(checkRedirect, payload);
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
          message: res.message
        }
      })
    ]);

    yield call(checkRedirect, payload);
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
  return api({
    method: 'put',
    url,
    data
  });
  // Return axios.put(`${config.HOST_APP}${url}`, data, {
  //   headers: {
  //     authorization: getCookie('token')
  //   }
  // })
  //   .then(res => res.data);
}
