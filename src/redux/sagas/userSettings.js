import {takeLatest, put, all} from 'redux-saga/effects';

import {types as userSettingsTypes} from '../ducks/userSettings';
import apiv2 from '../../services/apiv2';

export function * watchUserSettings() {
  yield takeLatest(userSettingsTypes.USER_SETTINGS_GET_REQUEST, onUserSettingsGet);
  yield takeLatest(userSettingsTypes.USER_SETTINGS_UPDATE_REQUEST, onUserSettingsUpdate);
}

function * onUserSettingsGet({payload}) {
  try {
    const res = yield getSettings(payload);

    yield all([
      put({
        type: userSettingsTypes.USER_SETTINGS_GET_SUCCESS,
        payload: res
      })
    ]);
  } catch (error) {
    yield put({
      type: userSettingsTypes.USER_SETTINGS_GET_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function * onUserSettingsUpdate({payload: settings}) {
  try {
    if (settings && Array.isArray(settings)) {
      settings = settings.map(setting => {
        delete setting.id;

        return setting;
      });
    }

    const res = yield updateSettings({settings});

    yield all([
      put({
        type: userSettingsTypes.USER_SETTINGS_UPDATE_SUCCESS,
        payload: {
          message: res.message
        }
      })
    ]);
  } catch (error) {
    yield put({
      type: userSettingsTypes.USER_SETTINGS_UPDATE_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
}

function getSettings() {
  return apiv2({
    url: '/me/usersettings'
  });
}

function updateSettings(data) {
  return apiv2({
    method: 'post',
    url: '/me/usersettings',
    data
  });
}
