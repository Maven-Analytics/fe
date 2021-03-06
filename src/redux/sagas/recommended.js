import {all, put, select, takeLatest} from 'redux-saga/effects';

import apiv2 from '../../services/apiv2';
import {removeCookie, setCookie} from '../../utils/cookies';
// Import axios from 'axios';
import {selectors as recommendedSelectors, types as recommendedTypes} from '../ducks/recommended';
import {selectors as userSelectors, types as userTypes} from '../ducks/user';

export function * watchRecommended() {
  yield takeLatest(recommendedTypes.RECOMMENDED_SET_REQUEST, onRecommendedSet);
}

function * onRecommendedSet({payload: {paths, courses, token}}) {
  try {
    const user = yield select(userSelectors.getUser);

    if (!token) {
      token = yield select(userSelectors.getToken);
    }

    if (token) {
      const res = yield saveRecommended(user, token, paths, courses);
      yield all([
        put({
          type: userTypes.USER_SET,
          payload: res
        }),
        put({
          type: recommendedTypes.RECOMMENDED_SET_SUCCESS
        })
      ]);
    } else {
      setCookie('recommendedPaths', paths);
      setCookie('recommendedCourses', courses);

      yield all([
        put({
          type: recommendedTypes.RECOMMENDED_SET_SUCCESS
        })
      ]);
    }
  } catch (error) {
    console.log('RECOMMENDED_SET error', error);

    yield put({
      type: recommendedTypes.RECOMMENDED_SET_FAILURE,
      payload: error
    });
  }
}

async function saveRecommended(user, token, paths, courses) {
  return apiv2({
    method: 'put',
    url: '/me',
    data: {
      first_name: user.get('first_name'),
      last_name: user.get('last_name'),
      email: user.get('email'),
      postal_code: user.get('postal_code'),
      country: user.get('country'),
      recommended_paths: paths,
      recommended_courses: courses
    },
    token
  });
}
