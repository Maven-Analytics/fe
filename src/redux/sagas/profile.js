import {takeLatest, put, all, call, select} from 'redux-saga/effects';
// Import axios from 'axios';

import {getCookie} from '../../utils/cookies';
import {types as profileTypes} from '../ducks/profile';
import {selectors as userSelectors, types as userTypes} from '../ducks/user';
import {checkRedirect} from './redirect';
import apiv2 from '../../services/apiv2';

export function * watchProfile() {
  yield takeLatest(profileTypes.PROFILEUPDATE_REQUEST, profileUpdateRequest);
  yield takeLatest(profileTypes.PROFILE_PASSWORD_RESET_REQUEST, onPasswordResetRequest);
}

function * profileUpdateRequest({payload}) {
  try {
    const res = yield call(apiv2, {
      url: '/me',
      method: 'put',
      data: payload
    });

    yield all([
      put({
        type: userTypes.USER_SET,
        payload: res.user
      }),
      put({
        type: profileTypes.PROFILEUPDATE_SUCCESS,
        payload: {
          message: 'Your profile has been updated.'
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
    const user = yield select(userSelectors.getUser);
    yield call(apiv2, {
      url: '/me',
      method: 'put',
      data: {
        ...payload,
        email: user.get('email'),
        first_name: user.get('first_name'),
        last_name: user.get('last_name'),
        postal_code: user.get('postal_code'),
        country: user.get('country')
      }
    });

    yield all([
      put({
        type: profileTypes.PROFILE_PASSWORD_RESET_SUCCESS,
        payload: {
          message: 'Your password has been reset.'
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
