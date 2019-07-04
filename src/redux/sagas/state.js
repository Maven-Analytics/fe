import {select, takeLatest} from 'redux-saga/effects';
import Router from 'next/router';

import {types as stateTypes, selectors as stateSelectors} from '../ducks/state';

export function * watchState() {
  yield takeLatest(stateTypes.OFFMENU_TOGGLE, onOffmenuChange);
  yield takeLatest(stateTypes.MODAL_OPEN, onOffmenuChange);
  yield takeLatest(stateTypes.MODAL_CLOSE, onOffmenuChange);
  yield takeLatest(stateTypes.STATE_RESET, onStateReset);
}

function * onOffmenuChange() {
  const state = yield select(stateSelectors.getState);

  if (state.get('mobileMenu')) {
    document.body.classList.add('mobile-menu-open');
  } else {
    document.body.classList.remove('mobile-menu-open');
  }

  if (state.getIn(['pathDrawer', 'open'])) {
    document.body.classList.add('path-drawer-open');
  } else {
    document.body.classList.remove('path-drawer-open');
  }
}

function * onStateReset() {
  document.body.classList.remove('mobile-menu-open');

  return yield true;
}
