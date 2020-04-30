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

export function stateListUpdate(state, newData, key = 'id') {
  if (!isImmutable(newData)) {
    newData = fromJS(newData);
  }

  return newData.reduce((s, newObject) => {
    const existingPathIndex = s.findIndex(p => p.get(key) === newObject.get(key));

    if (existingPathIndex > -1) {
      return s.update(existingPathIndex, existingData => existingData.merge(fromJS(newObject)));
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

export function sortProducts(products, state) {
  return products.sort((productA, productB) => {
    const key = state.getIn(['productSort', 'key']);
    const order = state.getIn(['productSort', 'order']);

    if (order === 'DESC') {
      if (!productA.get(key)) {
        return 1;
      }

      if (!productB.get(key)) {
        return -1;
      }

      return productB.get(key) - productA.get(key);
    }

    return productA.get(key) - productB.get(key);
  });
}
