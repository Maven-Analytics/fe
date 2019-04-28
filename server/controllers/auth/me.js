const axios = require('axios');
const {runSync} = require('../../utils/user');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;

  if (!id) {
    return {
      success: false
    };
  }

  const user = await getUser(id);

  runSync(user);

  return {
    success: true,
    data: {
      token: request.auth.token,
      user
    }
  };
};

function getUser(id) {
  return axios.get(`http://api:3000/api/v1/user/${id}`)
    .then(res => res.data.data[0]);
}
