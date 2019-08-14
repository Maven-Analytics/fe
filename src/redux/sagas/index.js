import {all, put, takeLatest, fork, select} from 'redux-saga/effects';
import axios from 'axios';

import {watchState} from './state';
import {types as authTypes} from '../ducks/auth';
import {types as userTypes, selectors as userSelectors} from '../ducks/user';
import {types as surveyResultTypes} from '../ducks/surveyResult';
import {types as responseTypes} from '../ducks/response';
import {watchCheckout} from './checkout';
import {watchPaths} from './paths';
import {watchCourses} from './courses';
import {watchSurveys} from './surveyResults';
import {watchProfile} from './profile';
import {watchDashboard} from './dashboard';
import {watchUser} from './user';
import {watchFilters} from './filter';
import {watchScores} from './scores';
import {watchSpotlights} from './spotlights';
import {watchPages} from './pages';
import {setCookie, removeCookie, getCookie} from '../../utils/cookies';
import config from '../../config';
import {watchContact} from './contact';

function * logoutRequest({payload: {ctx}}) {
  removeCookie('token', ctx);

  window.localStorage.setItem('logout', Date.now());
  yield all([
    put({
      type: userTypes.TOKEN_UNSET
    }),
    put({
      type: userTypes.USER_UNSET
    }),
    put({
      type: authTypes.LOGOUT_SUCCESS
    })
  ]);
}

function * reauthenticateRequest({payload: {token, isServer, ctx}}) {
  if (!token) {
    return;
  }

  try {
    const data = yield reauthenticate(token, isServer);

    if (!data.user) {
      removeCookie('token', ctx);
      // removeCookie('surveyResult', ctx);
      removeCookie('checkout', ctx);
      removeCookie('recommendedPaths', ctx);
      removeCookie('recommendedCourses', ctx);

      return yield all([
        put({
          type: authTypes.REAUTHENTICATE_SUCCESS
        })
      ]);
    }

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
    console.log('REAUTHENTICATE_FAILURE');
    yield put({
      type: authTypes.REAUTHENTICATE_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * loginRequest({payload}) {
  try {
    const data = yield login(payload);

    setCookie('token', data.token);

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

function * forgotRequest({payload}) {
  try {
    const data = yield forgot(payload);

    yield all([
      put({
        type: authTypes.FORGOT_SUCCESS,
        payload: {
          ...data
        }
      })
    ]);
  } catch (error) {
    yield put({
      type: authTypes.FORGOT_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * resetRequest({payload}) {
  try {
    const data = yield reset(payload);

    yield all([
      put({
        type: authTypes.RESET_SUCCESS,
        payload: {
          ...data
        }
      })
    ]);
  } catch (error) {
    yield put({
      type: authTypes.RESET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * registerRequest({payload}) {
  try {
    const recommendedCourses = yield select(userSelectors.getRecommendedCourses);
    const recommendedPaths = yield select(userSelectors.getRecommendedPaths);

    const data = yield register({...payload, recommended_courses: recommendedCourses.toJS(), recommended_paths: recommendedPaths.toJS()});

    setCookie('token', data.token);

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
    console.log(error);
    yield put({
      type: authTypes.REGISTER_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * ssoRequest({payload}) {
  try {
    const data = yield sso(payload);

    yield all([
      put({
        type: authTypes.SSO_SUCCESS
      })
    ]);

    if (data.ssoUrl) {
      window.location = data.ssoUrl;
    }
  } catch (error) {
    yield put({
      type: authTypes.SSO_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * rootSaga() {
  yield all([
    takeLatest(authTypes.REAUTHENTICATE_REQUEST, reauthenticateRequest),
    takeLatest(authTypes.LOGIN_REQUEST, loginRequest),
    takeLatest(authTypes.REGISTER_REQUEST, registerRequest),
    takeLatest(authTypes.LOGOUT_REQUEST, logoutRequest),
    takeLatest(authTypes.FORGOT_REQUEST, forgotRequest),
    takeLatest(authTypes.RESET_REQUEST, resetRequest),
    takeLatest(authTypes.SSO_REQUEST, ssoRequest),
    fork(watchState),
    fork(watchCheckout),
    fork(watchPaths),
    fork(watchCourses),
    fork(watchSurveys),
    fork(watchProfile),
    fork(watchUser),
    fork(watchDashboard),
    fork(watchFilters),
    fork(watchScores),
    fork(watchSpotlights),
    fork(watchPages),
    fork(watchContact)
  ]);
}

function sso({redirectTo}) {
  return authReq('sso', {redirectTo});
}

function reset({email, password, token}) {
  return authReq('reset', {email, password, token});
}

function forgot({email}) {
  return authReq('forgot', {email});
}

function login({email, password, redirectTo}) {
  return authReq('login', {email, password, redirectTo});
}

function register({email, password, first_name, last_name, country, postal_code, redirectTo, recommended_paths, recommended_courses}) {
  return authReq('register', {email, password, first_name, last_name, country, postal_code, redirectTo, recommended_paths, recommended_courses});
}

async function authReq(type, data) {
  const baseUrl = config.HOST_APP;

  return axios.post(`${baseUrl}/api/v1/${type}`, data, {
    headers: {
      authorization: getCookie('token')
    }
  })
    .then(res => res.data)
    .then(response => response.data);
}

function reauthenticate(token) {
  const baseUrl = config.HOST_APP;

  return axios.get(`${baseUrl}/api/v1/me`, {
    headers: {
      authorization: token
    }
  })
    .then(res => res.data)
    .then(response => response.data);
}

export default rootSaga;

