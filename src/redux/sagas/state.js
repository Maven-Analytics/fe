import {select, takeLatest, put, all} from 'redux-saga/effects';
import Router from 'next/router';

import {types as stateTypes, selectors as stateSelectors} from '../ducks/state';

export function * watchState() {
  yield takeLatest(stateTypes.OFFMENU_TOGGLE, onOffmenuChange);
  yield takeLatest(stateTypes.STATE_RESET, onStateReset);
}

function * onOffmenuChange() {
  const state = yield select(stateSelectors.getState);

  if (state.get('mobileMenu')) {
    document.body.classList.add('mobile-menu-open');
  } else {
    document.body.classList.remove('mobile-menu-open');
  }
}

function * onStateReset() {
  document.body.classList.remove('mobile-menu-open');

  return yield true;
}
