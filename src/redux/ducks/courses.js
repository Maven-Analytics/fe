import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';
import {getCourseBySlug} from '../../utils/courseHelpers';
import {selectors as filterSelectors} from './filters';
import {getFilteredCourses} from '../../utils/filterHelpers';
import {selectors as enrollmentSelectors} from './enrollments';
import {selectors as courseSelectors} from './courses';
import {selectors as userSelectors} from './user';
import {selectors as stateSelectors} from './state';
import {selectors as pathSelectors} from './paths';

export const types = {
  COURSESINIT_REQUEST: 'COURSESINIT_REQUEST',
  COURSESINIT_SUCCESS: 'COURSESINIT_SUCCESS',
  COURSESINIT_FAILURE: 'COURSESINIT_FAILURE',
  COURSES_FILTER_REQUEST: 'COURSES_FILTER_REQUEST',
  COURSES_FILTER_SUCCESS: 'COURSES_FILTER_SUCCESS',
  COURSES_FILTER_FAILURE: 'COURSES_FILTER_FAILURE',
  COURSES_GET_REQUEST: 'COURSES_GET_REQUEST',
  COURSES_GET_SUCCESS: 'COURSES_GET_SUCCESS',
  COURSES_GET_FAILURE: 'COURSES_GET_FAILURE'
};

export const actions = {
  coursesInit: obj => utils.action(types.COURSESINIT_REQUEST, obj),
  coursesFilter: obj => utils.action(types.COURSES_FILTER_REQUEST, obj),
  coursesGet: obj => utils.action(types.COURSES_GET_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.COURSESINIT_SUCCESS:
    return utils.stateListMerge(state, action.payload);
  case types.COURSES_GET_SUCCESS:
    return utils.stateListMerge(state, action.payload);
  case types.COURSES_FILTER_SUCCESS:
    return fromJS(action.payload);
  default:
    return state;
  }
};

const getCourses = state => state.get('courses');
const getCourse = (state, slug) => {
  return getCourseBySlug(state.get('courses'), slug);
};

const getCourseById = (state, id) => state.get('courses').find(c => c.get('thinkificCourseId') === id);

export const selectors = {
  getCourses: createSelector([getCourses, enrollmentSelectors.getEnrollments, userSelectors.getUser, stateSelectors.getState], (courses, enrollments, user, state) => {
    courses = courses.map(course => {
      const enrollment = enrollments.find(enrollment => enrollment.get('course_id') === course.get('thinkificCourseId'));
      const recommendedCourse = user.getIn(['user', 'recommended_courses']) && user.getIn(['user', 'recommended_courses']).find(rc => rc.get('id') === course.get('id'));

      return course
        .set('percentage_completed', enrollment && enrollment.get('percentage_completed'))
        .set('resumeUrl', course.get('url'))
        .set('lastTaken', enrollment && enrollment.get('updatedAt'))
        .set('match', recommendedCourse && recommendedCourse.get('percentage'));
    });

    courses = utils.sortProducts(courses, state);

    return courses;
  }),
  getCourse: createSelector([getCourse], c => c),
  getCourseById: createSelector([getCourseById], c => c),
  getFilteredCourses: createSelector([getCourses], courses => courses),
  // GetCompletedCourses: createSelector([getCourses], c => c.filter(c => c.get('completed'))),
  // getCoursesByCompletionDesc: createSelector([getCourses], c => c.sort((a, b) => b.get('percentage_completed') - a.get('percentage_completed'))),
  getCoursesForAssessmentPage: createSelector([getCourses], c => c.filter(c => c.get('assessmentPage')))
};
