import {takeLatest, put, call, all} from 'redux-saga/effects';

import {types as courseTypes} from '../ducks/courses';
import {getCourses} from '../../services/contentful';

export function * watchCourses() {
  yield takeLatest(courseTypes.COURSESINIT_REQUEST, onCoursesInitRequest);
}

function * onCoursesInitRequest() {
  try {
    const courses = yield getCourses({});

    yield all([
      put({
        type: courseTypes.COURSESINIT_SUCCESS,
        payload: courses
      })
    ]);
  } catch (error) {
    yield put({
      type: courseTypes.COURSESINIT_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
