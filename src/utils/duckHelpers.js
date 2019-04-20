import {fromJS} from 'immutable';

export function initialState(data) {
  return fromJS(data);
}

export function action(type, payload = {}) {
  return {type, payload};
}

export function requestTypes(base) {
  const REQUEST = 'REQUEST';
  const SUCCESS = 'SUCCESS';
  const FAILURE = 'FAILURE';

  return [REQUEST, SUCCESS, FAILURE].reduce((action, type) => {
    const baseType = `${base}_${type}`;

    action[baseType] = baseType;

    return action;
  }, {});
}
