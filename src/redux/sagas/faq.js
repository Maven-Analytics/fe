import {takeLatest, put, all} from 'redux-saga/effects';

import {types as faqTypes} from '../ducks/faq';
import {getFaqs} from '../../services/contentful';

export function * watchFaq() {
  yield takeLatest(faqTypes.FAQS_GET_REQUEST, onFaqGet);
}

function * onFaqGet() {
  try {
    const faqs = yield getFaqs({});

    yield all([
      put({
        type: faqTypes.FAQS_GET_SUCCESS,
        payload: faqs
      })
    ]);
  } catch (error) {
    console.log('FAQS err', error);
    yield put({
      type: faqTypes.FAQS_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
