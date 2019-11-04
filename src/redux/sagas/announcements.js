import {takeLatest, put, all} from 'redux-saga/effects';

import {types as announcementTypes} from '../ducks/announcements';
import {getAnnouncements} from '../../services/contentful';

export function* watchAnnouncements() {
  yield takeLatest(announcementTypes.ANNOUNCEMENTS_GET_REQUEST, onAnnouncementsGet);
}

function* onAnnouncementsGet({payload}) {
  try {
    const query = payload.query || {};
    const order = payload.order || null;

    const credentials = yield getAnnouncements(query, order);

    yield all([
      put({
        type: announcementTypes.ANNOUNCEMENTS_GET_SUCCESS,
        payload: credentials
      })
    ]);
  } catch (error) {
    yield put({
      type: announcementTypes.ANNOUNCEMENTS_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
