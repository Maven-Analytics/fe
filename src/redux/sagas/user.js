import {takeLatest, put, select, all} from 'redux-saga/effects';
import axios from 'axios';

import {types as userTypes, selectors as userSelectors} from '../ducks/user';
import {setCookie, getCookie} from '../../utils/cookies';
import config from '../../config';

export function * watchUser() {
  yield takeLatest(userTypes.USER_RECOMMENDED_SET, onRecommendedSet);
}

function * onRecommendedSet() {
  try {
    const paths = yield select(userSelectors.getRecommendedPaths);
    const courses = yield select(userSelectors.getRecommendedCourses);

    yield saveRecommended(paths, courses);

    setCookie('recommendedPaths', paths);
    setCookie('recommendedCourses', courses);
  } catch (error) {
    console.log(error);
  }
}

function * saveRecommended(paths, courses) {
  const baseUrl = config.HOST_APP;

  const token = yield select(userSelectors.getToken);

  if (!token) {
    return;
  }

  return axios.post(`${baseUrl}/api/v1/user/recommended`, {paths, courses}, {
    headers: {
      authorization: token
    }
  })
    .then(res => res.data)
    .then(response => response.data);
}
