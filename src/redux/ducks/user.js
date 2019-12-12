import {fromJS, Map} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {selectors as courseSelectors} from './courses';
import {selectors as pathSelectors} from './paths';

export const types = {
  USER_SET: 'USER_SET',
  USER_UNSET: 'USER_UNSET',
  TOKEN_SET: 'TOKEN_SET',
  TOKEN_UNSET: 'TOKEN_UNSET',
  THINKIFIC_TOKEN_SET: 'THINKIFIC_TOKEN_SET',
  THINKIFIC_TOKEN_UNSET: 'THINKIFIC_TOKEN_UNSET',
  USER_RECOMMENDED_SET_REQUEST: 'USER_RECOMMENDED_SET_REQUEST',
  USER_RECOMMENDED_SET_SUCCESS: 'USER_RECOMMENDED_SET_SUCCESS',
  USER_RECOMMENDED_SET_FAILURE: 'USER_RECOMMENDED_SET_FAILURE'
};

export const actions = {
  userSet: obj => utils.action(types.USER_SET, obj),
  userRecommendedSet: obj => utils.action(types.USER_RECOMMENDED_SET_REQUEST, obj)
};

const initialState = utils.initialState({
  token: null,
  thinkificToken: null,
  user: {},
  recommended: {
    paths: [],
    courses: []
  },
  gettingStarted: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.TOKEN_SET:
    return state.set('token', action.payload);
  case types.THINKIFIC_TOKEN_SET:
    return state.set('thinkificToken', action.payload);
  case types.USER_SET:
    return state.update('user', u => u.merge(fromJS(action.payload)));
  case types.TOKEN_UNSET:
    return state.set('token', initialState.get('token'));
  case types.USER_UNSET:
    return state.set('user', initialState.get('user'));
  case types.USER_RECOMMENDED_SET_REQUEST:
    return state.set('recommended', fromJS(action.payload));

  default:
    return state;
  }
};

const getUser = state => state.getIn(['user', 'user']);
const getToken = state => state.getIn(['user', 'token']);
const getThinkificToken = state => state.getIn(['user', 'thinkificToken']);
const getRecommendedPaths = state => state.getIn(['user', 'recommended', 'paths']);
const getRecommendedCourses = state => state.getIn(['user', 'recommended', 'courses']);

export const selectors = {
  getUser: createSelector(
    [getUser],
    u => u
  ),
  getToken: createSelector(
    [getToken],
    t => t
  ),
  getThinkificToken: createSelector(
    [getThinkificToken],
    t => t
  ),
  getRecommendedCourses: createSelector(
    [getRecommendedCourses],
    r => r
  ),
  getRecommendedPaths: createSelector(
    [getRecommendedPaths],
    r => r
  ),
  getRecommendedPathsForDisplay: createSelector(
    [getUser, getRecommendedPaths, pathSelectors.getPaths],
    (user, recommended, paths) => {
      recommended = user.get('recommended_paths') && user.get('recommended_paths').count() ? user.get('recommended_paths') : recommended;

      return recommended.map(r => {
        const path = paths.find(p => p.get('id') === r.get('id')) || Map();
        return fromJS({
          ...r.toJS(),
          match: r.get('percentage'),
          ...path.toJS()
        });
      });
    }
  ),
  getRecommendedCoursesForDisplay: createSelector(
    [getUser, getRecommendedCourses, courseSelectors.getCourses],
    (user, recommended, courses) => {
      recommended = user.get('recommended_courses') && user.get('recommended_courses').count() ? user.get('recommended_courses') : recommended;

      return recommended.map(r => {
        const course = courses.find(c => c.get('id') === r.get('id')) || Map();
        return fromJS({
          ...r.toJS(),
          match: r.get('percentage'),
          ...course.toJS()
        });
      });
    }
  )
};
