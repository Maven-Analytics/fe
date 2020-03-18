import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {selectors as enrollmentSelectors} from './enrollments';
import {selectors as stateSelectors} from './state';
import {selectors as userSelectors} from './user';

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

export const selectors = {
  getCourses: createSelector(
    [getCourses, enrollmentSelectors.getEnrollments, userSelectors.getUser, stateSelectors.getState],
    (courses, enrollments, user, state) => {
      courses = courses.map(course => {
        if (course.get('comingSoon')) {
          return course;
        }

        const enrollment = enrollments.find(
          enrollment => enrollment.get('course_id') === course.get('thinkificCourseId')
        );
        const recommendedCourse =
          user.get('recommended_courses') &&
          user.get('recommended_courses').find(rc => rc.get('id') === course.get('id'));

        let url = course.get('url');

        if (user && user.get('thinkificToken')) {
          url = `https://mavenanalytics.thinkific.com/api/sso/v2/sso/jwt?jwt=${user.get(
            'thinkificToken'
          )}&return_to=${url}`;
        }

        return course
          .set('percentage_completed', enrollment && enrollment.get('percentage_completed'))
          .set('resumeUrl', url)
          .set('url', url)
          .set('lastTaken', enrollment && enrollment.get('updatedAt'))
          .set('match', recommendedCourse && recommendedCourse.get('percentage'));
      });

      courses = utils.sortProducts(courses, state);

      return courses;
    }
  )
};
