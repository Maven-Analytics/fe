import * as utils from '../../utils/duckHelpers';

export const types = {
  CONTACT_SEND_REQUEST: 'CONTACT_SEND_REQUEST',
  CONTACT_SEND_SUCCESS: 'CONTACT_SEND_SUCCESS',
  CONTACT_SEND_FAILURE: 'CONTACT_SEND_FAILURE'
};

export const actions = {
  contactSend: obj => utils.action(types.CONTACT_SEND_REQUEST, obj)
};

const initialState = utils.initialState([]);

export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
