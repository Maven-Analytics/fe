import {takeLatest, put, select, all} from 'redux-saga/effects';
// Import axios from 'axios';

import {types as userTypes, selectors as userSelectors} from '../ducks/user';
import {setCookie, removeCookie} from '../../utils/cookies';
import config from '../../config';
import api from '../../services/api';

export function * watchUser() {
  // Yield takeLatest(userTypes.USER_RECOMMENDED_SET_REQUEST, onRecommendedSet);
}

// Function * onRecommendedSet() {
//   try {
//     const paths = yield select(userSelectors.getRecommendedPaths);
//     const courses = yield select(userSelectors.getRecommendedCourses);

//     const token = yield select(userSelectors.getToken);

//     if (token) {
//       const res = yield saveRecommended(paths, courses, token);

//       yield all([
//         put({
//           type: userTypes.USER_SET,
//           payload: res.user
//         }),
//         put({
//           type: userTypes.USER_RECOMMENDED_SET_SUCCESS
//         })
//       ]);
//       removeCookie('recommendedPaths');
//       removeCookie('recommendedCourses');
//     } else {
//       setCookie('recommendedPaths', paths);
//       setCookie('recommendedCourses', courses);

//       yield all([
//         put({
//           type: userTypes.USER_RECOMMENDED_SET_SUCCESS
//         })
//       ]);
//     }
//   } catch (error) {
//     console.log('USER_RECOMMENDED_SET_FAILURE');
//     yield put({
//       type: userTypes.USER_RECOMMENDED_SET_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }

// async function saveRecommended(paths, courses, token) {
//   return api({
//     method: 'post',
//     url: '/api/v1/user/recommended',
//     data: {paths, courses},
//     token
//   });
//   // Const baseUrl = config.HOST_APP;

//   // return axios.post(`${baseUrl}/api/v1/user/recommended`, {paths, courses}, {
//   //   headers: {
//   //     authorization: token
//   //   }
//   // })
//   //   .then(res => res.data)
//   //   .then(response => response.data);
// }
