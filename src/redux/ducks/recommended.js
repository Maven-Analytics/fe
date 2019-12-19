import {fromJS, Map} from 'immutable';
import {createSelector} from 'reselect';

import {selectors as courseSelectors} from './courses';
import {selectors as pathSelectors} from './paths';
import {selectors as userSelectors} from './user';
import * as utils from '../../utils/duckHelpers';

export const types = {
  RECOMMENDED_SET_REQUEST: 'RECOMMENDED_SET_REQUEST',
  RECOMMENDED_SET_SUCCESS: 'RECOMMENDED_SET_SUCCESS',
  RECOMMENDED_SET_FAILURE: 'RECOMMENDED_SET_FAILURE',
  RECOMMENDED_INIT: 'RECOMMENDED_INIT'
};

export const actions = {
  recommendedSet: obj => utils.action(types.RECOMMENDED_SET_REQUEST, obj),
  recommendedInit: obj => utils.action(types.RECOMMENDED_INIT, obj)
};

const initialState = utils.initialState({
  paths: [],
  courses: []
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.RECOMMENDED_SET_REQUEST:
  case types.RECOMMENDED_INIT:
    return fromJS(action.payload);

  default:
    return state;
  }
};

const getRecommended = state => state.get('recommended');
export const selectors = {
  getRecommended: createSelector(
    [getRecommended, courseSelectors.getCourses, pathSelectors.getPaths, userSelectors.getUser],
    (recommended, courses, paths, user) => {
      const recommendedPaths = user.has('recommended_paths') && user.get('recommended_paths').count() ? user.get('recommended_paths') : recommended.get('paths');
      const recommendedCourses = user.has('recommended_courses') && user.get('recommended_courses').count() ? user.get('recommended_courses') : recommended.get('courses');
      return fromJS({
        paths: recommendedPaths
          .map(rp => {
            const path = paths.find(path => path.get('id') === rp.get('id')) || Map();

            return path.merge(fromJS({
              id: rp.get('id'),
              match: rp.get('percentage')
            }));
          }),
        courses: recommendedCourses
          .map(rc => {
            const course = courses.find(course => course.get('id') === rc.get('id')) || Map();

            return course.merge(fromJS({
              id: rc.get('id'),
              match: rc.get('percentage')
            }));
          })
      });
    }
  ),
  getRecommendedPaths: createSelector([getRecommended], r => r.get('paths')),
  getRecommendedCourses: createSelector([getRecommended], r => r.get('courses'))
};
