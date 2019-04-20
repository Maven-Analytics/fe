const axios = require('axios');
const Boom = require('boom');
const {User} = require('mv-models');
const {login} = require('../../utils/auth');
const jwt = require('../../utils/jwt');

module.exports = async (request, h) => {
  let data = request.payload;

  const res = await makeRequest(data);
  const user = await findUser(res.id);

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

async function findUser(id) {
  return User.findOne({
    where: {
      id
    }
  });
}
