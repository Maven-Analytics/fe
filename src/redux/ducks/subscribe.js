import * as utils from '../../utils/duckHelpers';

export const types = {
  SUBSCRIBE_REQUEST: 'SUBSCRIBE_REQUEST',
  SUBSCRIBE_SUCCESS: 'SUBSCRIBE_SUCCESS',
  SUBSCRIBE_FAILURE: 'SUBSCRIBE_FAILURE'
};

export const actions = {
  subscribeSend: obj => utils.action(types.SUBSCRIBE_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
