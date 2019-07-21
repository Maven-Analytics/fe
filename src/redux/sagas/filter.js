import {takeLatest, put, all} from 'redux-saga/effects';

import {types as filterTypes} from '../ducks/filters';
import api from '../../services/api';

export function * watchFilters() {
  yield takeLatest(filterTypes.FILTERS_GET_REQUEST, onFiltersGet);
}

function * onFiltersGet() {
  try {
    const paths = yield getFilters();

    yield all([
      put({
        type: filterTypes.FILTERS_GET_SUCCESS,
        payload: paths
      })
    ]);
  } catch (error) {
    yield put({
      type: filterTypes.FILTERS_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function getFilters() {
  return api({
    method: 'get',
    url: '/api/v1/filters'
  });
}
