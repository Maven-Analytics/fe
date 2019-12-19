import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

import * as utils from '../../utils/duckHelpers';

export const types = {
  DASHBOARD_GET_REQUEST: 'DASHBOARD_GET_REQUEST',
  DASHBOARD_GET_SUCCESS: 'DASHBOARD_GET_SUCCESS',
  DASHBOARD_GET_FAILURE: 'DASHBOARD_GET_FAILURE',
  DASHBOARD_RESET: 'DASHBOARD_RESET'
};

export const actions = {
  dashboardGet: obj => utils.action(types.DASHBOARD_GET_REQUEST, obj)
};

const initialState = utils.initialState({
  onboarding: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
  case types.DASHBOARD_GET_SUCCESS:
    return state.set('onboarding', fromJS(action.payload.onboarding));
  case types.DASHBOARD_RESET:
    return initialState;
  default:
    return state;
  }
};

const getOnboarding = state => state.getIn(['dashboard', 'onboarding']);

export const selectors = {
  getOnboarding: createSelector(
    [getOnboarding],
    s => s
  )
};
