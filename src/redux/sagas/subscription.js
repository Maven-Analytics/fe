import {takeLatest, put, all, call} from 'redux-saga/effects';

import {types as subscriptionTypes} from '../ducks/subscription';
import apiv2 from '../../services/apiv2';

export function * watchSubscription() {
  yield takeLatest(subscriptionTypes.SUBSCRIPTION_GET_REQUEST, onSubscriptionGet);
}

function * onSubscriptionGet({payload: {token, ...payload}}) {
  try {
    const subscription = yield call(getSubscription, payload, token);

    yield all([
      put({
        type: subscriptionTypes.SUBSCRIPTION_GET_SUCCESS,
        payload: subscription
      })
    ]);
  } catch (error) {
    yield put({
      type: subscriptionTypes.SUBSCRIPTION_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * getSubscription({query = {}, order = String(['createdAt', 'DESC'])}, token) {
  return yield apiv2({
    url: '/me/subscriptions',
    params: {
      ...query,
      order
    },
    token
  });
}
