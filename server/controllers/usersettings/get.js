const axios = require('axios');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;

  return {
    success: true,
    data: await getUserSettings(id)
  };
};

function getUserSettings(id) {
  return axios.get(`${process.env.HOST_API}/api/v1/usersettings`, {
    params: {
      user_id: id
    }
  })
    .then(res => res.data.data);
}
