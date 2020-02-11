import {all, put, takeLatest} from 'redux-saga/effects';

import {removeCookie, setCookie} from '../../utils/cookies';
import {types as checkoutTypes} from '../ducks/checkout';

export function * watchCheckout() {
  yield takeLatest(checkoutTypes.CHECKOUT_SET_PLAN_REQUEST, onCheckoutRequest);
  yield takeLatest(checkoutTypes.CHECKOUT_UNSET, onCheckoutUnset);
}

function * onCheckoutRequest({payload: {plan, ctx}}) {
  try {
    setCookie(
      'checkout',
      {
        plan: {
          id: plan.get('id'),
          planId: plan.get('planId')
        }
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

function * onCheckoutUnset({payload: {ctx}}) {
  removeCookie('checkout', ctx);

  return yield null;
}
