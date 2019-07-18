import {fromJS, isImmutable} from 'immutable';

export function initialState(data) {
  return fromJS(data);
}

export function action(type, payload = {}, rest) {
  return {type, payload, ...rest};
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

export function stateListMerge(state, newData) {
  if (!isImmutable(newData)) {
    newData = fromJS(newData);
  }

  return newData.reduce((s, newObject) => {
    const existingPathIndex = s.findIndex(p => p.get('id') === newObject.get('id'));

    if (existingPathIndex > -1) {
      return s.set(existingPathIndex, fromJS(newObject));
    }

    return s.push(fromJS(newObject));
  }, state);
}

export function stateMapMerge(state, newData) {
  if (!isImmutable(newData)) {
    newData = fromJS(newData);
  }

  return state.merge(newData);
}
