const axios = require('axios');
const Boom = require('boom');
const {login} = require('../../utils/auth');
const jwt = require('../../utils/jwt');
const userSync = require('../../utils/userSync');

module.exports = async (request, h) => {
  let data = request.payload;

  const res = await makeRequest(data);
  const user = await findUser(res.id);

  await userSync(user.email);

  return login(h, user, data.redirectTo);
};

async function makeRequest(data) {
  return axios({
    baseURL: process.env.API_HOST,
    url: '/api/v1/user',
    method: 'post',
    headers: {
      Authorization: `Bearer ${await jwt()}`
    },
    data
  })
    .then(res => res.data.data)
    .catch(err => {
      if (err.response.data) {
        throw new Boom(err.response.data.message, err.response.data);
      } else {
        throw Boom.boomify(err, err.response.data);
      }
    });
}

function findUser(id) {
  return axios.get(`${process.env.API_HOST}/api/v1/user/${id}`)
    .then(res => res.data.data[0]);
}
