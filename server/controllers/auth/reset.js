const axios = require('axios');
const {handleApiError} = require('../../utils/error');

module.exports = async request => {
  let data = request.payload;

  try {
    await reset(data.email, data.password, data.token);

    return {
      success: true,
      data: {
        message: 'Your password has been reset.'
      }
    };
  } catch (error) {
    return error;
  }
};

async function reset(email, password, token) {
  return axios.post(`${process.env.HOST_API}/api/v1/auth/reset`, {
    email,
    password,
    token
  })
    .then(res => res.data)
    .catch(handleApiError);
}
