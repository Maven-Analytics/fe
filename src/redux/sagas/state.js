import {select, takeLatest} from 'redux-saga/effects';

import {types as stateTypes, selectors as stateSelectors} from '../ducks/state';

export function * watchState() {
  yield takeLatest(stateTypes.OFFMENU_TOGGLE, onOffmenuChange);
}

function * onOffmenuChange() {
  const state = yield select(stateSelectors.getState);

  if (state.get('mobileMenu')) {
    document.body.classList.add('mobile-menu-open');
  } else {
    document.body.classList.remove('mobile-menu-open');
  }
}
