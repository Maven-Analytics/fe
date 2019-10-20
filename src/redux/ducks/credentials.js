import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {getPathBySlug} from '../../utils/pathHelpers';

export const types = {
  CREDENTIALS_GET_REQUEST: 'CREDENTIALS_GET_REQUEST',
  CREDENTIALS_GET_SUCCESS: 'CREDENTIALS_GET_SUCCESS',
  CREDENTIALS_GET_FAILURE: 'CREDENTIALS_GET_FAILURE'
};

export const actions = {
  credentialsGet: obj => utils.action(types.CREDENTIALS_GET_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREDENTIALS_GET_SUCCESS:
      return utils.stateListMerge(state, action.payload);
    default:
      return state;
  }
};

const getCredentials = state => state.get('credentials');
const getCredentialByGroupId = (state, groupId) => state.get('credentials').find(c => c.get('group_id') === groupId);

export const selectors = {
  getCredentials: createSelector(
    [getCredentials],
    c => c
  ),
  getCredentialByGroupId: createSelector(
    [getCredentialByGroupId],
    c => c
  )
};