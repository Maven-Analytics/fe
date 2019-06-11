const axios = require('axios');
const {getSsoUrl} = require('../../utils/auth');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;
  let data = request.payload;

  if (!id) {
    return {
      success: false
    };
  }

  const user = await getUser(id);

  const ssoUrl = await getSsoUrl(user, data.redirectTo);

  return {
    success: true,
    data: {
      ssoUrl
    }
  };
};

function getUser(id) {
  return axios.get(`http://api:3000/api/v1/user/${id}`)
    .then(res => res.data.data[0]);
}
