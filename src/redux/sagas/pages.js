import {all, put, takeEvery} from 'redux-saga/effects';

import {types as pageTypes} from '#root/redux/ducks/pages';
import {getPages} from '#root/services/contentful';

export function * watchPages() {
  yield takeEvery(pageTypes.PAGES_GET_REQUEST, onPagesGet);
}

function * onPagesGet({payload}) {
  try {
    const pages = yield getPages({
      query: {
        'fields.slug': payload.slug
      }
    });

    yield all([
      put({
        type: pageTypes.PAGES_GET_SUCCESS,
        payload: pages
      })
    ]);
  } catch (error) {
    console.log('pages err', error);
    yield put({
      type: pageTypes.PAGES_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
