import {takeLatest, put, all, select, call} from 'redux-saga/effects';

import {types as courseTypes} from '../ducks/courses';
import {selectors as activeFilterSelectors} from '../ducks/activeFilters';
import apiv2 from '../../services/apiv2';

export function * watchCourses() {
  yield takeLatest(courseTypes.COURSESINIT_REQUEST, onCoursesInitRequest);
  yield takeLatest(courseTypes.COURSES_FILTER_REQUEST, onCoursesFilter);
  yield takeLatest(courseTypes.COURSES_GET_REQUEST, onCoursesGet);
}

function * onCoursesInitRequest({payload}) {
  try {
    const params = payload.params || {};

    const courses = yield getCourses(params);

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

    const {enrollmentFilter, ...query} = params;

    let courses = yield getCourses({...query, progress: enrollmentFilter}, true);

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

function * onCoursesGet({payload}) {
  try {
    const activeFilters = yield select(activeFilterSelectors.getActiveFilters);

    let params = activeFilters
      .filter(v => !v.isEmpty())
      .map(v => v.join(','))
      .toJS();

    if (payload.params) {
      params = {
        ...payload.params,
        ...params
      };
    }

    const courses = yield getCourses(params, true);

    yield all([
      put({
        type: courseTypes.COURSES_GET_SUCCESS,
        payload: courses
      })
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: courseTypes.COURSES_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function getCourses(params = {}) {
  return apiv2({
    method: 'get',
    url: '/public/courses',
    params
  });
}
