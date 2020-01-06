import * as utils from '../../utils/duckHelpers';

export const types = {
  REAUTHENTICATE_REQUEST: 'REAUTHENTICATE_REQUEST',
  REAUTHENTICATE_SUCCESS: 'REAUTHENTICATE_SUCCESS',
  REAUTHENTICATE_FAILURE: 'REAUTHENTICATE_FAILURE',
  ENSURE_ENROLLED_REQUEST: 'ENSURE_ENROLLED_REQUEST',
  ENSURE_ENROLLED_SUCCESS: 'ENSURE_ENROLLED_SUCCESS',
  ENSURE_ENROLLED_FAILURE: 'ENSURE_ENROLLED_FAILURE',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
  FORGOT_REQUEST: 'FORGOT_REQUEST',
  FORGOT_SUCCESS: 'FORGOT_SUCCESS',
  FORGOT_FAILURE: 'FORGOT_FAILURE',
  RESET_REQUEST: 'RESET_REQUEST',
  RESET_SUCCESS: 'RESET_SUCCESS',
  RESET_FAILURE: 'RESET_FAILURE',
  SSO_REQUEST: 'SSO_REQUEST',
  SSO_SUCCESS: 'SSO_SUCCESS',
  SSO_FAILURE: 'SSO_FAILURE',
  LOGIN: 'LOGIN'
};

export const actions = {
  reauthenticate: obj => utils.action(types.REAUTHENTICATE_REQUEST, obj),
  ensureEnrolled: obj => utils.action(types.ENSURE_ENROLLED_REQUEST, obj),
  login: obj => utils.action(types.LOGIN, obj),
  logout: obj => utils.action(types.LOGOUT_REQUEST, obj),
  forgot: obj => utils.action(types.FORGOT_REQUEST, obj),
  reset: obj => utils.action(types.RESET_REQUEST, obj),
  register: obj => utils.action(types.REGISTER_REQUEST, obj),
  sso: obj => utils.action(types.SSO_REQUEST, obj)
};
