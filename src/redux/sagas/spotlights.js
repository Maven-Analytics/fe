import {takeLatest, put, all} from 'redux-saga/effects';

import {types as spotlightTypes} from '../ducks/spotlights';
import {getSpotlights} from '../../services/contentful';

export function * watchSpotlights() {
  yield takeLatest(spotlightTypes.SPOTLIGHTS_GET_REQUEST, onSpotlightsGet);
}

function * onSpotlightsGet() {
  try {
    const spotlights = yield getSpotlights({});
    yield all([
      put({
        type: spotlightTypes.SPOTLIGHTS_GET_SUCCESS,
        payload: spotlights
      })
    ]);
  } catch (error) {
    yield put({
      type: spotlightTypes.SPOTLIGHTS_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
