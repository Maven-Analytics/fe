const axios = require('axios');
const Boom = require('boom');

module.exports = async request => {
  let data = request.payload;
  const email = data.email;

  try {
    await forgot(email);

    return {
      success: true,
      data: {
        message: `A password reset email has been sent to ${email}.`
      }
    };
  } catch (error) {
    return error;
  }
};

async function forgot(email) {
  return axios.post('http://api:3000/api/v1/user/forgot', {
    email
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
