import {takeLatest, put, all} from 'redux-saga/effects';

import {types as authorTypes} from '../ducks/authors';
import api from '../../services/api';

export function * watchAuthors() {
  yield takeLatest(authorTypes.AUTHORS_INIT_REQUEST, onAuthorsInit);
}

function * onAuthorsInit({payload}) {
  try {
    const query = payload.query || {};

    const authors = yield getAuthors({query});

    yield all([
      put({
        type: authorTypes.AUTHORS_INIT_SUCCESS,
        payload: authors
      })
    ]);
  } catch (error) {
    yield put({
      type: authorTypes.AUTHORS_INIT_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function getAuthors() {
  return api({
    method: 'get',
    url: '/api/v1/authors'
  });
}
