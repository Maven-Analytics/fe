import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {List} from 'immutable';

const initialState = utils.initialState({});
export default (state = initialState, action) => {
  const {type} = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // Not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  // Store whether a request is happening at the moment or not
  // e.g. will be true when receiving ACTIONNAME_REQUEST
  //      and false when receiving ACTIONNAME_SUCCESS / ACTIONNAME_FAILURE
  return state.set(requestName, requestState === 'REQUEST');
};

const getLoading = actions => {
  actions = List.isList(actions) ? actions : List(actions);

  return state => {
    return actions.some(action => state.getIn(['loading', action]));
  };
};

export const selectors = {
  getLoading: createSelector([getLoading], l => l)
};
