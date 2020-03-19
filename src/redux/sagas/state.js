import {all, call, delay, put, select, takeLatest} from 'redux-saga/effects';

import gatewayService from '#root/services/gateway';
import {canUseDOM} from '#root/utils/componentHelpers';

import {selectors as stateSelectors, types as stateTypes} from '../ducks/state';
import {env} from '#root/constants';

// 5 mins
const THINKIFIC_HEALTH_CHECK_INTERVAL = parseInt(env.THINKIFIC_HEALTH_CHECK_INTERVAL, 10);

export function* watchState() {
  yield takeLatest(stateTypes.OFFMENU_TOGGLE, onOffmenuChange);
  yield takeLatest(stateTypes.MODAL_OPEN, onOffmenuChange);
  yield takeLatest(stateTypes.MODAL_CLOSE, onOffmenuChange);
  yield takeLatest(stateTypes.STATE_RESET, onStateReset);
  yield call(thinkificHealthCheck);
}

function* onOffmenuChange() {
  const state = yield select(stateSelectors.getState);

  // If (state.get('mobileMenu')) {
  //   document.body.classList.add('mobile-menu-open');
  // } else {
  //   document.body.classList.remove('mobile-menu-open');
  // }

  if (state.getIn(['pathDrawer', 'open'])) {
    document.body.classList.add('path-drawer-open');
  } else {
    document.body.classList.remove('path-drawer-open');
  }

  if (state.getIn(['courseDrawer', 'open'])) {
    document.body.classList.add('path-drawer-open');
  } else {
    document.body.classList.remove('path-drawer-open');
  }

  if (state.getIn(['video', 'open'])) {
    document.body.classList.add('video-modal-open');
  } else {
    document.body.classList.remove('video-modal-open');
  }

  if (state.getIn(['assessment', 'open'])) {
    document.body.classList.add('video-modal-open');
  } else {
    document.body.classList.remove('video-modal-open');
  }
}

function* onStateReset() {
  document.body.classList.remove('mobile-menu-open');

  return yield true;
}

function* thinkificHealthCheck() {
  if (!canUseDOM()) {
    return;
  }

  while (true) {
    yield put({
      type: stateTypes.THINKIFIC_HEALTH_REQUEST
    });
    const {errors, data} = yield call(gatewayService, {
      query: `
    {
      thinkificHealth {
        id
        success
      }
    }
    `
    });

    if (data) {
      yield all([
        put({
          type: stateTypes.THINKIFIC_HEALTH_SUCCESS
        }),
        put({
          type: stateTypes.HEALTH_SET,
          payload: {
            key: 'thinkific',
            healthy: true
          }
        })
      ]);
    } else if (errors) {
      yield all([
        put({
          type: stateTypes.THINKIFIC_HEALTH_FAILURE
        }),
        put({
          type: stateTypes.HEALTH_SET,
          payload: {
            key: 'thinkific',
            healthy: false
          }
        })
      ]);
    }

    // Wait and then try again
    yield delay(THINKIFIC_HEALTH_CHECK_INTERVAL);
  }
}
