import {all, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import {types as checkoutTypes} from '../ducks/checkout';
import {setCookie} from '../../utils/cookies';
import config from '../../config';

export function * watchCheckout() {
  yield takeLatest(checkoutTypes.CHECKOUT_REQUEST, onCheckoutRequest);
  yield takeLatest(checkoutTypes.GET_CHECKOUT_REQUEST, onGetCheckoutRequest);
}

function * onCheckoutRequest({payload: {plan}}) {
  try {
    // const data = yield updateCheckout(plan);
    // setCookie('checkout', data.token);

    yield all([
      put({
        type: checkoutTypes.CHECKOUT_SUCCESS
      })
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: checkoutTypes.CHECKOUT_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * onGetCheckoutRequest({payload: {token, isServer}}) {
  try {
    const data = yield getCheckout(token, isServer);

    yield all([
      put({
        type: checkoutTypes.GET_CHECKOUT_SUCCESS,
        payload: data
      })
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: checkoutTypes.GET_CHECKOUT_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function updateCheckout(plan) {
  return axios.put('/api/v1/checkout', {
    plan: {
      id: plan.get('id'),
      checkoutUrl: plan.get('checkoutUrl')
    }
  })
    .then(res => res.data)
    .then(response => response.data);
}

function getCheckout(token, isServer) {
  const baseUrl = isServer ? 'http://localhost:3000' : config.HOST_APP;
  return axios.get(`${baseUrl}/api/v1/checkout/${token}`)
    .then(res => res.data)
    .then(response => response.data);
}
