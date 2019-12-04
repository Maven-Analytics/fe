const axios = require('axios');
const {runSync} = require('../../utils/user');
const {getServerUri} = require('../../utils/serverUtils');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;
  const user = await getUser(id);

  if (!id || !user) {
    return {
      success: false
    };
  }

  await runSync(user, true);

  return {
    success: true,
    data: await reauthenticate(request)
  };
};

function getUser(id) {
  return axios.get(`${process.env.HOST_API}/api/v1/user/${id}`)
    .then(res => res.data.data[0]);
}

function reauthenticate(request) {
  return axios.get(`${getServerUri(request)}/api/v1/me`, {
    headers: {
      Authorization: request.auth.token
    }
  })
    .then(res => res.data.data ? res.data.data : null);
}
