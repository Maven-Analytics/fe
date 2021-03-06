import {fromJS, Map} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
// Import {selectors as courseSelectors} from './courses';
// import {selectors as pathSelectors} from './paths';

export const types = {
  USER_SET: 'USER_SET',
  USER_UNSET: 'USER_UNSET',
  TOKEN_SET: 'TOKEN_SET',
  TOKEN_UNSET: 'TOKEN_UNSET',
  THINKIFIC_TOKEN_SET: 'THINKIFIC_TOKEN_SET',
  THINKIFIC_TOKEN_UNSET: 'THINKIFIC_TOKEN_UNSET'
};

export const actions = {
  userSet: obj => utils.action(types.USER_SET, obj),
  userUnset: () => utils.action(types.USER_UNSET),
  tokenSet: obj => utils.action(types.TOKEN_SET, obj),
  thinkificTokenSet: obj => utils.action(types.THINKIFIC_TOKEN_SET, obj)
};

const initialState = utils.initialState({
  token: null,
  thinkificToken: null,
  user: {},
  recommended: {
    paths: [],
    courses: []
  }
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
  default:
    return state;
  }
};

const getUser = state => state.getIn(['user', 'user']);
const getToken = state => state.getIn(['user', 'token']);
const getThinkificToken = state => state.getIn(['user', 'thinkificToken']);

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
  )
};
