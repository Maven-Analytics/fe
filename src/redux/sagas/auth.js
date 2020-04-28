import {fromJS} from 'immutable';
import {all, call, delay, put, select, take, takeLatest} from 'redux-saga/effects';

import client from '#root/api/graphQlClient';

import apiv2 from '../../services/apiv2';
import {ssoRedirect} from '../../services/sso';
import {getCookie, removeCookie, setCookie} from '../../utils/cookies';
import {subscriptionEnrolled} from '../../utils/subscriptionHelpers';
import {types as authTypes} from '../ducks/auth';
import {types as credentialTypes} from '../ducks/credentials';
import {types as dashboardTypes} from '../ducks/dashboard';
import {types as enrollmentTypes} from '../ducks/enrollments';
import {selectors as recommendedSelectors} from '../ducks/recommended';
import {types as recommendedTypes} from '../ducks/recommended';
import {types as scoreTypes} from '../ducks/scores';
import {selectors as subscriptionSelectors, types as subscriptionTypes} from '../ducks/subscription';
import {selectors as userSelectors, types as userTypes} from '../ducks/user';

export function* watchAuth() {
  // Yield takeLatest(authTypes.LOGIN_REQUEST, loginRequest);
  // yield takeLatest(authTypes.REAUTHENTICATE_REQUEST, reauthenticateRequest);
  // yield takeLatest(authTypes.REGISTER_REQUEST, registerRequest);
  // yield takeLatest(authTypes.LOGOUT_REQUEST, logoutRequest);
  yield takeLatest(authTypes.SSO_REQUEST, ssoRequest);
  // Yield takeLatest(authTypes.ENSURE_ENROLLED_REQUEST, ensureEnrolled);
  yield takeLatest(authTypes.FORGOT_REQUEST, onForgotRequest);
  yield takeLatest(authTypes.RESET_REQUEST, onResetRequest);
  yield takeLatest(authTypes.LOGIN, login);
}

function* login({payload: {token, thinkificToken, redirectTo, ...user}}) {
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

  // If (redirectTo) {
  //   ssoRedirect(thinkificToken, redirectTo);
  // }
}

function* loginRequest({payload: {redirectTo, ...data}}) {
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
      // Call(delay, 1000),
      call(doLogin, res, true, redirectTo)
    ]);
  } catch (error) {
    yield put({
      type: authTypes.LOGIN_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function* logoutRequest({payload: {ctx}}) {
  removeCookie('token', ctx);
  removeCookie('thinkificToken', ctx);

  // Const logoutEvt = new window.Event('logout');
  // window.dispatchEvent(logoutEvt);
  // window.localStorage.setItem('logout', Date.now());
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
    // Delay(500), // Delay 1/2 a second so the user is redirected to login
    put({
      type: subscriptionTypes.SUBSCRIPTION_RESET
    }),
    put({
      type: enrollmentTypes.ENROLLMENTS_RESET
    }),
    put({
      type: dashboardTypes.DASHBOARD_RESET
    }),
    put({
      type: credentialTypes.CREDENTIALS_RESET
    }),
    put({
      type: scoreTypes.SCORES_RESET
    }),
    put({
      type: authTypes.LOGOUT_SUCCESS
    })
  ]);
}

function* ssoRequest({payload: {redirectTo}}) {
  const thinkificToken = yield select(userSelectors.getThinkificToken);

  ssoRedirect(thinkificToken, redirectTo);
}

function* registerRequest({payload: {redirectTo, ...data}}) {
  try {
    const recommendedCourses = yield select(recommendedSelectors.getRecommendedCourses);
    const recommendedPaths = yield select(recommendedSelectors.getRecommendedPaths);

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

function* doLogin({token, thinkificToken, ...user}, doRedirect, redirectTo) {
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

function* reauthenticateRequest({payload: {token, ctx}}) {
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
      call(doLogin, res, false),
      call(checkRecommended, ctx)
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

function* ensureEnrolled() {
  try {
    const subscription = yield select(subscriptionSelectors.getCurrentSubscription);

    if (subscriptionEnrolled(subscription)) {
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
        url: '/me/subscriptions'
      });

      yield delay(1000);
    } while (!subscriptionEnrolled(fromJS(data)));

    yield all([
      put({
        type: authTypes.ENSURE_ENROLLED_SUCCESS
      }),
      put({
        type: subscriptionTypes.SUBSCRIPTION_GET_SUCCESS,
        payload: data
      })
    ]);
  } catch (error) {
    console.log('ENSURE_ENROLLED_FAILURE', error);
    yield put({
      type: authTypes.ENSURE_ENROLLED_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function* checkRecommended(ctx) {
  const paths = getCookie('recommendedPaths', ctx);
  const courses = getCookie('recommendedCourses', ctx);

  console.log(paths);

  if (paths && courses) {
    yield all([
      put({
        type: recommendedTypes.RECOMMENDED_SET_REQUEST,
        payload: {
          paths,
          courses
        }
      }),
      take(recommendedTypes.RECOMMENDED_SET_SUCCESS),
      call(removeCookie, 'recommendedPaths', ctx),
      call(removeCookie, 'recommendedCourses', ctx)
    ]);
  }
}

function* onForgotRequest({payload}) {
  try {
    yield call(apiv2, {
      url: '/public/auth/forgot',
      data: payload,
      method: 'post'
    });

    yield all([
      put({
        type: authTypes.FORGOT_SUCCESS,
        payload: {
          message: `An email has been sent to ${payload.email}`
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

function* onResetRequest({payload}) {
  try {
    yield call(apiv2, {
      url: '/public/auth/reset',
      data: payload,
      method: 'post'
    });

    yield all([
      put({
        type: authTypes.RESET_SUCCESS,
        payload: {
          message: 'Your password has been reset.'
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
