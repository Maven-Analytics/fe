const axios = require('axios');
const Boom = require('boom');
const {login} = require('../../utils/auth');

module.exports = async (request, h) => {
  let data = request.payload;

  try {
    let user = await auth(data.email, data.password);

    return login(h, user, data.redirectTo);
  } catch (error) {
    return error;
  }
};

async function auth(email, password) {
  return axios.post(`${process.env.API_HOST}/api/v1/auth`, {
    email,
    password
  })
    .then(res => res.data.data.user)
    .catch(err => {
      if (err.response.data) {
        throw new Boom(err.response.data.message, err.response.data);
      } else {
        throw Boom.boomify(err, err.response.data);
      }
    });
}
