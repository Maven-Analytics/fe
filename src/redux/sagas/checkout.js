import {all, put, takeLatest} from 'redux-saga/effects';

import {types as checkoutTypes} from '../ducks/checkout';
import {setCookie} from '../../utils/cookies';

export function * watchCheckout() {
  yield takeLatest(checkoutTypes.CHECKOUT_SET_PLAN_REQUEST, onCheckoutRequest);
}

function * onCheckoutRequest({payload: {plan, ctx}}) {
  try {
    setCookie(
      'checkout',
      {
        plan: plan.toJS()
      },
      ctx
    );

    yield all([
      put({
        type: checkoutTypes.CHECKOUT_SET_PLAN_SUCCESS
      })
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: checkoutTypes.CHECKOUT_SET_PLAN_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}
