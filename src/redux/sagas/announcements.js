import {takeLatest, put, all} from 'redux-saga/effects';

import {types as announcementTypes} from '../ducks/announcements';
// Import {getAnnouncements} from '../../services/contentful';
import apiv2 from '../../services/apiv2';

export function * watchAnnouncements() {
  yield takeLatest(announcementTypes.ANNOUNCEMENTS_GET_REQUEST, onAnnouncementsGet);
}

function * onAnnouncementsGet({payload}) {
  try {
    const query = payload.query || {};
    const order = payload.order || null;

    const announcements = yield apiv2({
      url: '/public/announcements',
      params: {
        ...query,
        order
      }
    });

    yield all([
      put({
        type: announcementTypes.ANNOUNCEMENTS_GET_SUCCESS,
        payload: announcements
      })
    ]);
  } catch (error) {
    yield put({
      type: announcementTypes.ANNOUNCEMENTS_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
