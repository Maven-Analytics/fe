const axios = require('axios');
const Boom = require('boom');

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
  return axios.post('http://api:3000/api/v1/user/reset', {
    email,
    password,
    token
  })
    .then(res => res.data)
    .catch(err => {
      if (err.response && err.response.data) {
        throw new Boom(err.response.data.message, err.response.data);
      } else {
        throw Boom.boomify(err, {
          message: err.message
        });
      }
    });
}
