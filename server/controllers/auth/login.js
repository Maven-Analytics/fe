const axios = require('axios');
const Boom = require('boom');
const {login} = require('../../utils/auth');
const userSync = require('../../utils/userSync');

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
    .then(res => res.data.data.user);
}
