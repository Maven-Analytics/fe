import {takeLatest, put, all, call} from 'redux-saga/effects';

import {types as subscribeTypes} from '../ducks/subscribe';
import zapier from '../../services/zapier';

export function * watchSubscribe() {
  yield takeLatest(subscribeTypes.SUBSCRIBE_REQUEST, onSubscribeRequest);
}

function * onSubscribeRequest({payload}) {
  try {
    if (!payload.email || payload.email === '') {
      throw new Error('Please enter your email address.');
    }

    const res = yield call(sendData, payload);

    yield all([
      put({
        type: subscribeTypes.SUBSCRIBE_SUCCESS,
        payload: {
          message: res
        }
      })
    ]);
  } catch (error) {
    console.log('CONTACT err', error);
    yield put({
      type: subscribeTypes.SUBSCRIBE_FAILURE,
      payload: error.response ? error.response.data : {message: error.message}
    });
  }
}

async function sendData(payload) {
  // throw new Error('Error sending message');

  try {
    const {hook, ...data} = payload;

    await zapier(hook, data);

    return 'You have been subscribed!';
  } catch (error) {
    throw error;
  }
}
