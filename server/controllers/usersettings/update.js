const axios = require('axios');

const {handleApiError} = require('../../utils/error');

module.exports = async request => {
  const user_id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;
  const settings = request.payload.settings;

  const res = await updateAllSettings(user_id, settings);

  return {
    success: true,
    data: {
      settings: res,
      message: 'Your settings have been updated!'
    }
  };
};

async function updateAllSettings(user_id, settings) {
  return Promise.all(
    settings.map(setting => makeRequest(user_id, setting))
  );
}

async function makeRequest(user_id, data) {
  return axios({
    url: `${process.env.HOST_API}/api/v1/usersettings`,
    method: 'post',
    data: Object.assign(data, {user_id})
  })
    .then(res => res.data.data)
    .then(settings => {
      // API returns ALL settings, only return the one that was made with the request
      return settings.find(setting => setting.setting_id === data.setting_id);
    })
    .catch(handleApiError);
}
