import {createSelector} from 'reselect';

import * as utils from '../../utils/duckHelpers';

export const types = {
  ANNOUNCEMENTS_GET_REQUEST: 'ANNOUNCEMENTS_GET_REQUEST',
  ANNOUNCEMENTS_GET_SUCCESS: 'ANNOUNCEMENTS_GET_SUCCESS',
  ANNOUNCEMENTS_GET_FAILURE: 'ANNOUNCEMENTS_GET_FAILURE'
};

export const actions = {
  announcementsGet: obj => utils.action(types.ANNOUNCEMENTS_GET_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ANNOUNCEMENTS_GET_SUCCESS:
      return utils.stateListMerge(state, action.payload);
    default:
      return state;
  }
};

const getAnnouncements = state => state.get('announcements');

export const selectors = {
  getAnnouncements: createSelector(
    [getAnnouncements],
    announcements => {
      return announcements.filter(a => a.get('pinned')).concat(announcements.filter(a => !a.get('pinned')));
    }
  )
};
