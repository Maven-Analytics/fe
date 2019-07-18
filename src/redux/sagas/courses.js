import {takeLatest, put, all} from 'redux-saga/effects';
import {fromJS} from 'immutable';

import {types as courseTypes} from '../ducks/courses';
import {types as filterTypes} from '../ducks/filters';
import {getCourses} from '../../services/contentful';
import {getFiltersFromCourses} from '../../utils/filterHelpers';

export function * watchCourses() {
  yield takeLatest(courseTypes.COURSESINIT_REQUEST, onCoursesInitRequest);
}

function * onCoursesInitRequest({payload}) {
  try {
    const query = payload.query || {};

    const courses = yield getCourses({query});

    yield all([
      put({
        type: courseTypes.COURSESINIT_SUCCESS,
        payload: courses
      }),
      put({
        type: filterTypes.FILTER_OPTIONS_SET,
        payload: getFiltersFromCourses(fromJS(courses))
      })
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: courseTypes.COURSESINIT_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
