import {takeLatest, put, all} from 'redux-saga/effects';

import {types as dashboardTypes} from '../ducks/dashboard';
import api from '../../services/api';

export function * watchDashboard() {
  yield takeLatest(dashboardTypes.DASHBOARD_PROGRESS_REQUEST, onGetProgressRequest);
  yield takeLatest(dashboardTypes.DASHBOARD_ONBOARDING_REQUEST, onGetOnboarding);
}

function * onGetProgressRequest() {
  try {
    const data = yield getProgress();

    yield all([
      put({
        type: dashboardTypes.DASHBOARD_PROGRESS_SUCCESS,
        payload: data
      })
    ]);
  } catch (error) {
    yield put({
      type: dashboardTypes.DASHBOARD_PROGRESS_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * onGetOnboarding() {
  try {
    const data = yield getGettingStarted();

    yield all([
      put({
        type: dashboardTypes.DASHBOARD_ONBOARDING_SUCCESS,
        payload: data
      })
    ]);
  } catch (error) {
    yield put({
      type: dashboardTypes.DASHBOARD_ONBOARDING_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function getProgress() {
  return api({
    method: 'get',
    url: '/api/v1/dashboard/progress'
  });
}

function getGettingStarted() {
  return api({
    method: 'get',
    url: '/api/v1/dashboard/gettingStarted'
  });
}
