import {takeLatest, put, all} from 'redux-saga/effects';

import {types as dashboardTypes} from '../ducks/dashboard';
import {types as enrollmentTypes} from '../ducks/enrollments';
import {types as credentialTypes} from '../ducks/credentials';
import api from '../../services/api';
import apiv2 from '../../services/apiv2';

export function * watchDashboard() {
  yield takeLatest(dashboardTypes.DASHBOARD_GET_REQUEST, onDashboardGet);
  // Yield takeLatest(dashboardTypes.DASHBOARD_PROGRESS_REQUEST, onGetProgressRequest);
  // Yield takeLatest(dashboardTypes.DASHBOARD_ONBOARDING_REQUEST, onGetOnboarding);
}

function * onDashboardGet() {
  try {
    const data = yield apiv2({
      url: '/me/dashboard'
    });

    yield all([
      put({
        type: enrollmentTypes.ENROLLMENTS_SET,
        payload: data.enrollments
      }),
      put({
        type: credentialTypes.CREDENTIALS_SET,
        payload: data.credentials
      }),
      put({
        type: dashboardTypes.DASHBOARD_GET_SUCCESS,
        payload: data
      })
    ]);
  } catch (error) {
    yield put({
      type: dashboardTypes.DASHBOARD_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

// Function * onGetProgressRequest() {
//   try {
//     const data = yield getProgress();

//     yield all([
//       put({
//         type: dashboardTypes.DASHBOARD_PROGRESS_SUCCESS,
//         payload: data
//       })
//     ]);
//   } catch (error) {
//     yield put({
//       type: dashboardTypes.DASHBOARD_PROGRESS_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }

// Function * onGetOnboarding() {
//   try {
//     const data = yield getOnboarding();

//     yield all([
//       put({
//         type: dashboardTypes.DASHBOARD_ONBOARDING_SUCCESS,
//         payload: data
//       })
//     ]);
//   } catch (error) {
//     yield put({
//       type: dashboardTypes.DASHBOARD_ONBOARDING_FAILURE,
//       payload: error.response ? error.response.data : error.message
//     });
//   }
// }

// function getProgress() {
//   return api({
//     method: 'get',
//     url: '/api/v1/dashboard/progress'
//   });
// }

// Function getOnboarding() {
//   return api({
//     method: 'get',
//     url: '/api/v1/dashboard/onboarding'
//   });
// }
