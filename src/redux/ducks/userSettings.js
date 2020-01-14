import {fromJS, Map} from 'immutable';
import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  USER_SETTINGS_GET_REQUEST: 'USER_SETTINGS_GET_REQUEST',
  USER_SETTINGS_GET_SUCCESS: 'USER_SETTINGS_GET_SUCCESS',
  USER_SETTINGS_GET_FAILURE: 'USER_SETTINGS_GET_FAILURE',
  USER_SETTINGS_UPDATE_REQUEST: 'USER_SETTINGS_UPDATE_REQUEST',
  USER_SETTINGS_UPDATE_SUCCESS: 'USER_SETTINGS_UPDATE_SUCCESS',
  USER_SETTINGS_UPDATE_FAILURE: 'USER_SETTINGS_UPDATE_FAILURE'
};

export const actions = {
  userSettingsGet: obj => utils.action(types.USER_SETTINGS_GET_REQUEST, obj),
  userSettingsSet: obj => utils.action(types.USER_SETTINGS_GET_SUCCESS, obj),
  userSettingsUpdate: obj => utils.action(types.USER_SETTINGS_UPDATE_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  case types.USER_SETTINGS_GET_SUCCESS:
  case types.USER_SETTINGS_UPDATE_REQUEST:
    return utils.stateListUpdate(state, action.payload);
  default:
    return state;
  }
};

const getUserSettings = state => state.get('userSettings');
const getUserSetting = (state, key) => state.get('userSettings').find(s => s.get('key') === key) || Map();

export const selectors = {
  getUserSettings: createSelector([getUserSettings], s => s),
  getUserSetting: createSelector([getUserSetting], s => s)
};
