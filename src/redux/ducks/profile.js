import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  PROFILEUPDATE_REQUEST: 'PROFILEUPDATE_REQUEST',
  PROFILEUPDATE_SUCCESS: 'PROFILEUPDATE_SUCCESS',
  PROFILEUPDATE_FAILURE: 'PROFILEUPDATE_FAILURE',
  PROFILE_PASSWORD_RESET_REQUEST: 'PROFILE_PASSWORD_RESET_REQUEST',
  PROFILE_PASSWORD_RESET_SUCCESS: 'PROFILE_PASSWORD_RESET_SUCCESS',
  PROFILE_PASSWORD_RESET_FAILURE: 'PROFILE_PASSWORD_RESET_FAILURE'
};

export const actions = {
  profileUpdate: obj => utils.action(types.PROFILEUPDATE_REQUEST, obj),
  passwordReset: obj => utils.action(types.PROFILE_PASSWORD_RESET_REQUEST, obj)
};

const initialState = utils.initialState({});

export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const getProfile = state => state.get('profile');

export const selectors = {
  getProfile: createSelector([getProfile], p => p)
};
