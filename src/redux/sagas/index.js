import {all, put, takeLatest, fork, select, delay} from 'redux-saga/effects';
// Import axios from 'axios';

import {watchState} from './state';
import {types as authTypes} from '../ducks/auth';
import {types as userTypes, selectors as userSelectors} from '../ducks/user';
import {types as surveyResultTypes} from '../ducks/surveyResult';
import {types as responseTypes} from '../ducks/response';
import {watchAuth} from './auth';
import {watchCheckout} from './checkout';
import {watchPaths} from './paths';
import {watchCourses} from './courses';
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
import {watchSubscribe} from './subscribe';
import zapier from '../../services/zapier';
import {watchCredentials} from './credentials';
import {watchAnnouncements} from './announcements';
import {watchUserSettings} from './userSettings';
import api from '../../services/api';
import {watchEnrollments} from './enrollments';
import {watchRecommended} from './recommended';
import {watchSubscription} from './subscription';

// Function * logoutRequest({payload: {ctx}}) {
//   removeCookie('token', ctx);
//   removeCookie('thinkificToken', ctx);

//   const logoutEvt = new window.Event('logout');
//   window.dispatchEvent(logoutEvt);
//   window.localStorage.setItem('logout', Date.now());
//   yield all([
//     put({
//       type: userTypes.TOKEN_UNSET
//     }),
//     put({
//       type: userTypes.THINKIFIC_TOKEN_UNSET
//     }),
//     put({
//       type: userTypes.USER_UNSET
//     }),
//     put({
//       type: authTypes.LOGOUT_SUCCESS
//     })
//   ]);
// }

// function * reauthenticateRequest({payload: {token, isServer, ctx}}) {
//   if (!token) {
//     return;
//   }

//   try {
//     const data = yield reauthenticate(token, isServer);

//     if (!data || !data.user) {
//       removeCookie('token', ctx);
//       // RemoveCookie('surveyResult', ctx);
//       removeCookie('checkout', ctx);
//       removeCookie('recommendedPaths', ctx);
//       removeCookie('recommendedCourses', ctx);

//       return yield all([
//         put({
//           type: authTypes.REAUTHENTICATE_SUCCESS
//         })
//       ]);
//     }

//     yield all([
//       put({
//         type: userTypes.TOKEN_SET,
//         payload: data.token
//       }),
//       put({
//         type: userTypes.USER_SET,
//         payload: data.user
//       }),
//       put({
//         type: authTypes.REAUTHENTICATE_SUCCESS
//       })
//     ]);
//   } catch (error) {
//     console.log('REAUTHENTICATE_FAILURE', error);
//     yield put({
//       type: authTypes.REAUTHENTICATE_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }

// Function * loginRequest({payload}) {
//   try {
//     const data = yield login(payload);

//     setCookie('token', data.token);

//     yield all([
//       put({
//         type: userTypes.TOKEN_SET,
//         payload: data.token
//       }),
//       put({
//         type: userTypes.USER_SET,
//         payload: data.user
//       }),
//       put({
//         type: authTypes.LOGIN_SUCCESS,
//         payload: data
//       })
//     ]);

//     if (data.ssoUrl) {
//       window.location = data.ssoUrl;
//     }
//   } catch (error) {
//     yield put({
//       type: authTypes.LOGIN_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }

// function * forgotRequest({payload}) {
//   try {
//     const data = yield forgot(payload);

//     yield all([
//       put({
//         type: authTypes.FORGOT_SUCCESS,
//         payload: {
//           ...data
//         }
//       })
//     ]);
//   } catch (error) {
//     yield put({
//       type: authTypes.FORGOT_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }

// function * resetRequest({payload}) {
//   try {
//     const data = yield reset(payload);

//     yield all([
//       put({
//         type: authTypes.RESET_SUCCESS,
//         payload: {
//           ...data
//         }
//       })
//     ]);
//   } catch (error) {
//     yield put({
//       type: authTypes.RESET_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }

// Function * registerRequest({payload}) {
//   try {
//     const recommendedCourses = yield select(userSelectors.getRecommendedCourses);
//     const recommendedPaths = yield select(userSelectors.getRecommendedPaths);

//     yield zapier('https://hooks.zapier.com/hooks/catch/4268756/obkw8rs/', {
//       first_name: payload.first_name,
//       last_name: payload.last_name,
//       email: payload.email
//     });

//     const data = yield register({
//       ...payload,
//       recommended_courses: recommendedCourses.toJS(),
//       recommended_paths: recommendedPaths.toJS()
//     });

//     setCookie('token', data.token);

//     yield all([
//       put({
//         type: userTypes.USER_SET,
//         payload: data.user
//       }),
//       put({
//         type: authTypes.REGISTER_SUCCESS
//       })
//     ]);

//     if (data.ssoUrl) {
//       window.location = data.ssoUrl;
//     }
//   } catch (error) {
//     console.log(error);
//     yield put({
//       type: authTypes.REGISTER_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }

// function * ssoRequest({payload}) {
//   try {
//     const data = yield sso(payload);

//     yield all([
//       put({
//         type: authTypes.SSO_SUCCESS
//       })
//     ]);

//     if (data.ssoUrl) {
//       window.location = data.ssoUrl;
//     }
//   } catch (error) {
//     yield put({
//       type: authTypes.SSO_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }

function * rootSaga() {
  yield all([
    // TakeLatest(authTypes.REAUTHENTICATE_REQUEST, reauthenticateRequest),
    // takeLatest(authTypes.ENSURE_ENROLLED_REQUEST, ensureEnrolled),
    // TakeLatest(authTypes.LOGIN_REQUEST, loginRequest),
    // takeLatest(authTypes.REGISTER_REQUEST, registerRequest),
    // takeLatest(authTypes.LOGOUT_REQUEST, logoutRequest),
    // takeLatest(authTypes.FORGOT_REQUEST, forgotRequest),
    // takeLatest(authTypes.RESET_REQUEST, resetRequest),
    // TakeLatest(authTypes.SSO_REQUEST, ssoRequest),
    fork(watchAuth),
    fork(watchState),
    fork(watchCheckout),
    fork(watchPaths),
    fork(watchCourses),
    fork(watchProfile),
    fork(watchUser),
    fork(watchDashboard),
    fork(watchFilters),
    fork(watchScores),
    fork(watchSpotlights),
    fork(watchPages),
    fork(watchContact),
    fork(watchSubscribe),
    fork(watchCredentials),
    fork(watchAnnouncements),
    fork(watchUserSettings),
    fork(watchEnrollments),
    fork(watchRecommended),
    fork(watchSubscription)
  ]);
}

// Function sso({redirectTo}) {
//   return authReq('sso', {redirectTo});
// }

// function reset({email, password, token}) {
//   return authReq('reset', {email, password, token});
// }

// function forgot({email}) {
//   return authReq('forgot', {email});
// }

// Function login({email, password, redirectTo}) {
//   return authReq('login', {email, password, redirectTo});
// }

// function register({
//   email,
//   password,
//   first_name,
//   last_name,
//   country,
//   postal_code,
//   redirectTo,
//   recommended_paths,
//   recommended_courses
// }) {
//   return authReq('register', {
//     email,
//     password,
//     first_name,
//     last_name,
//     country,
//     postal_code,
//     redirectTo,
//     recommended_paths,
//     recommended_courses
//   });
// }

// async function authReq(type, data) {
//   // Const baseUrl = config.HOST_APP;

//   return api({
//     method: 'post',
//     url: `/api/v1/${type}`,
//     data
//   });

//   // Return axios
//   //   .post(`${baseUrl}/api/v1/${type}`, data, {
//   //     headers: {
//   //       authorization: getCookie('token')
//   //     }
//   //   })
//   //   .then(res => res.data)
//   //   .then(response => response.data);
// }

// Function sync(token) {
//   return api({
//     method: 'get',
//     url: '/api/v1/sync',
//     token
//   });
// }

// function reauthenticate(token, isServer) {
//   return api({
//     method: 'get',
//     url: '/api/v1/me',
//     token
//   });
//   // Const baseUrl = isServer ? config.HOST_SERVER : config.HOST_APP;

//   // Return axios
//   //   .get(`${baseUrl}/api/v1/me`, {
//   //     headers: {
//   //       authorization: token
//   //     }
//   //   })
//   //   .then(res => res.data)
//   //   .then(response => response.data);
// }

export default rootSaga;
