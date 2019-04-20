import {fromJS} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  USER_SET: 'USER_SET',
  USER_UNSET: 'USER_UNSET',
  TOKEN_SET: 'TOKEN_SET',
  TOKEN_UNSET: 'TOKEN_UNSET'
};

export const actions = {
  userSet: obj => utils.action(types.USER_SET, obj)
};

const initialState = utils.initialState({
  token: null,
  user: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.TOKEN_SET:
    return state.set('token', action.payload);
  case types.USER_SET:
    return state.set('user', fromJS(action.payload));
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

export const selectors = {
  getUser: createSelector([getUser], u => u),
  getToken: createSelector([getToken], t => t)
};
