import {takeLatest, put, all} from 'redux-saga/effects';

import {types as filterTypes} from '../ducks/filters';
import apiv2 from '../../services/apiv2';

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
  return apiv2({
    url: '/public/filters'
  });
}
