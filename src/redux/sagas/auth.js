
import {all, put, takeLatest, call, select, delay} from 'redux-saga/effects';

import {types as authTypes} from '../ducks/auth';
import {types as userTypes, selectors as userSelectors} from '../ducks/user';
import {selectors as recommendedSelectors} from '../ducks/recommended';
import {setCookie, removeCookie} from '../../utils/cookies';
import apiv2 from '../../services/apiv2';
import {ssoRedirect} from '../../services/sso';
import {userEnrolled} from '../../utils/userHelpers';
import {fromJS} from 'immutable';

export function * watchAuth() {
  yield takeLatest(authTypes.LOGIN_REQUEST, loginRequest);
  yield takeLatest(authTypes.REAUTHENTICATE_REQUEST, reauthenticateRequest);
  yield takeLatest(authTypes.REGISTER_REQUEST, registerRequest);
  yield takeLatest(authTypes.LOGOUT_REQUEST, logoutRequest);
  yield takeLatest(authTypes.SSO_REQUEST, ssoRequest);
  yield takeLatest(authTypes.ENSURE_ENROLLED_REQUEST, ensureEnrolled);
}

function * loginRequest({payload: {redirectTo, ...data}}) {
  try {
    const res = yield apiv2({
      method: 'post',
      url: '/public/auth/login',
      data
    });

    yield all([
      put({
        type: authTypes.LOGIN_SUCCESS,
        payload: res
      }),
      call(doLogin, res, true, redirectTo)
    ]);
  } catch (error) {
    yield put({
      type: authTypes.LOGIN_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * logoutRequest({payload: {ctx}}) {
  removeCookie('token', ctx);
  removeCookie('thinkificToken', ctx);

  const logoutEvt = new window.Event('logout');
  window.dispatchEvent(logoutEvt);
  window.localStorage.setItem('logout', Date.now());
  yield all([
    put({
      type: userTypes.TOKEN_UNSET
    }),
    put({
      type: userTypes.THINKIFIC_TOKEN_UNSET
    }),
    put({
      type: userTypes.USER_UNSET
    }),
    put({
      type: authTypes.LOGOUT_SUCCESS
    })
  ]);
}

function * ssoRequest({payload: {redirectTo}}) {
  const thinkificToken = yield select(userSelectors.getThinkificToken);

  ssoRedirect(thinkificToken, redirectTo);
}

function * registerRequest({payload: {redirectTo, ...data}}) {
  try {
    const recommended = yield select(recommendedSelectors.getRecommended);

    const recommendedCourses = recommended.get('courses');
    const recommendedPaths = recommended.get('paths');

    const res = yield apiv2({
      url: '/public/auth/register',
      method: 'post',
      data: {
        ...data,
        recommended_courses: recommendedCourses.toJS(),
        recommended_paths: recommendedPaths.toJS()
      }
    });

    yield all([
      put({
        type: authTypes.REGISTER_SUCCESS
      }),
      call(doLogin, res, true, redirectTo)
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: authTypes.REGISTER_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * doLogin({user, token, thinkificToken}, doRedirect, redirectTo) {
  setCookie('token', token);
  setCookie('thinkificToken', thinkificToken);

  yield all([
    put({
      type: userTypes.TOKEN_SET,
      payload: token
    }),
    put({
      type: userTypes.THINKIFIC_TOKEN_SET,
      payload: thinkificToken
    }),
    put({
      type: userTypes.USER_SET,
      payload: user
    })
  ]);

  if (doRedirect) {
    ssoRedirect(thinkificToken, redirectTo);
  }
}

function * reauthenticateRequest({payload: {token, ctx}}) {
  if (!token) {
    return;
  }

  try {
    const res = yield apiv2({
      method: 'get',
      url: '/me',
      token
    });

    yield all([
      put({
        type: authTypes.REAUTHENTICATE_SUCCESS
      }),
      call(doLogin, res, false)
    ]);
  } catch (error) {
    console.log('REAUTHENTICATE_FAILURE', error);
    removeCookie('token', ctx);
    removeCookie('thinkificToken', ctx);
    removeCookie('checkout', ctx);
    removeCookie('recommendedPaths', ctx);
    removeCookie('recommendedCourses', ctx);
    yield put({
      type: authTypes.REAUTHENTICATE_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * ensureEnrolled() {
  try {
    const user = yield select(userSelectors.getUser);

    if (userEnrolled(user)) {
      return yield all([
        put({
          type: authTypes.ENSURE_ENROLLED_SUCCESS
        })
      ]);
    }

    let data = null;

    do {
      data = yield apiv2({
        method: 'get',
        url: '/me'
      });

      yield delay(1000);
    } while (!userEnrolled(fromJS(data.user)));

    yield all([
      put({
        type: authTypes.ENSURE_ENROLLED_SUCCESS
      }),
      call(doLogin, data, false)
    ]);
  } catch (error) {
    console.log('ENSURE_ENROLLED_FAILURE', error);
    yield put({
      type: authTypes.ENSURE_ENROLLED_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
