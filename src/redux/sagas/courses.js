import {takeLatest, put, all, select} from 'redux-saga/effects';
import {fromJS} from 'immutable';

import {types as courseTypes} from '../ducks/courses';
import {selectors as activeFilterSelectors} from '../ducks/activeFilters';
import {getFiltersFromCourses} from '../../utils/filterHelpers';
import api from '../../services/api';

export function * watchCourses() {
  yield takeLatest(courseTypes.COURSESINIT_REQUEST, onCoursesInitRequest);
  yield takeLatest(courseTypes.COURSES_FILTER_REQUEST, onCoursesFilter);
}

function * onCoursesInitRequest({payload}) {
  try {
    const query = payload.query || {};

    const courses = yield getCourses();

    yield all([
      put({
        type: courseTypes.COURSESINIT_SUCCESS,
        payload: courses
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

function * onCoursesFilter() {
  try {
    const activeFilters = yield select(activeFilterSelectors.getActiveFilters);

    const params = activeFilters
      .filter(v => !v.isEmpty())
      .map(v => v.join(','))
      .toJS();

    const courses = yield getCourses(params);

    yield all([
      put({
        type: courseTypes.COURSES_FILTER_SUCCESS,
        payload: courses
      })
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: courseTypes.COURSES_FILTER_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function getCourses(params = {}) {
  return api({
    method: 'get',
    url: '/api/v1/courses',
    params
  });
}
