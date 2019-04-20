import {all, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import {types as authTypes} from '../ducks/auth';
import {types as userTypes} from '../ducks/user';

function * logoutRequest() {
  yield logout();
  yield all([
    put({
      type: userTypes.TOKEN_UNSET
    }),
    put({
      type: userTypes.USER_UNSET
    })
  ]);
}

function * reauthenticateRequest({payload: {token}}) {
  if (!token) {
    return;
  }

  try {
    const data = yield reauthenticate(token);

    yield all([
      put({
        type: userTypes.TOKEN_SET,
        payload: data.token
      }),
      put({
        type: userTypes.USER_SET,
        payload: data.user
      }),
      put({
        type: authTypes.REAUTHENTICATE_SUCCESS
      })
    ]);
  } catch (error) {
    yield put({
      type: authTypes.REAUTHENTICATE_SUCCESS,
      payload: error.response.data
    });
  }
}

function * loginRequest({payload}) {
  try {
    const data = yield login(payload);

    yield all([
      put({
        type: userTypes.TOKEN_SET,
        payload: data.token
      }),
      put({
        type: userTypes.USER_SET,
        payload: data.user
      }),
      put({
        type: authTypes.LOGIN_SUCCESS,
        payload: data
      })
    ]);

    if (data.ssoUrl) {
      window.location = data.ssoUrl;
    }
  } catch (error) {
    yield put({
      type: authTypes.LOGIN_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * registerRequest({payload}) {
  try {
    const data = yield register(payload);

    yield all([
      put({
        type: userTypes.USER_SET,
        payload: data.user
      }),
      put({
        type: authTypes.REGISTER_SUCCESS
      })
    ]);

    if (data.ssoUrl) {
      window.location = data.ssoUrl;
    }
  } catch (error) {
    yield put({
      type: authTypes.REGISTER_FAILURE,
      payload: error.response.data
    });
  }
}

function * rootSaga() {
  yield all([
    takeLatest(authTypes.REAUTHENTICATE_REQUEST, reauthenticateRequest),
    takeLatest(authTypes.LOGIN_REQUEST, loginRequest),
    takeLatest(authTypes.REGISTER_REQUEST, registerRequest),
    takeLatest(authTypes.LOGOUT_REQUEST, logoutRequest)
  ]);
}

function login({email, password, redirectTo}) {
  return authReq('login', {email, password, redirectTo});
}

function register({email, password, first_name, last_name, redirectTo}) {
  return authReq('register', {email, password, first_name, last_name, redirectTo});
}

function logout() {
  return authReq('logout');
}

async function authReq(type, data) {
  return axios.post(`http://localhost:3000/api/v1/${type}`, data)
    .then(res => res.data)
    .then(response => response.data);
}

function reauthenticate(token) {
  return axios.get('http://localhost:3000/api/v1/me', {
    headers: {
      authorization: token
    }
  })
    .then(res => res.data)
    .then(response => response.data);
}

export default rootSaga;

