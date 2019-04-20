import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';
import {List} from 'immutable';

const initialState = utils.initialState({});
export default (state = initialState, action) => {
  const {type, payload} = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  // Not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  // Store whether a request is happening at the moment or not
  // e.g. will be true when receiving ACTIONNAME_REQUEST
  //      and false when receiving ACTIONNAME_SUCCESS / ACTIONNAME_FAILURE
  return state.set(requestName, requestState === 'FAILURE' ? payload.message : null);
};

const getError = actions => {
  actions = List.isList(actions) ? actions : List(actions);

  return state => {
    return actions
      .map(action => state.getIn(['error', action]))
      .filter(e => e)
      .first() || '';
  };
};

export const selectors = {
  getError: createSelector([getError], l => l)
};
