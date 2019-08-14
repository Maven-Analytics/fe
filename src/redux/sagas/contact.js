import {takeLatest, put, all, call} from 'redux-saga/effects';

import {types as contactTypes} from '../ducks/contact';

export function * watchContact() {
  yield takeLatest(contactTypes.CONTACT_SEND_REQUEST, onContactSend);
}

function * onContactSend({payload}) {
  try {
    const res = yield call(sendMessage, payload);

    yield all([
      put({
        type: contactTypes.CONTACT_SEND_SUCCESS,
        payload: {
          message: res
        }
      })
    ]);
  } catch (error) {
    console.log('CONTACT err', error);
    yield put({
      type: contactTypes.CONTACT_SEND_FAILURE,
      payload: error.response ? error.response.data : {message: error.message}
    });
  }
}

async function sendMessage(payload) {
  // throw new Error('Error sending message');

  return 'Your message has been sent!';
}
