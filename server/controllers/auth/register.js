const axios = require('axios');
const Boom = require('boom');
const {login} = require('../../utils/auth');
const jwt = require('../../utils/jwt');
const {runSync} = require('../../utils/user');

module.exports = async (request, h) => {
  let data = request.payload;

  const res = await makeRequest(data);
  const user = await findUser(res.id);

  await runSync(user);

  return login(h, user, `${request.info.referrer}about`);
};

async function makeRequest(data) {
  return axios({
    url: 'http://api:3000/api/v1/user',
    method: 'post',
    headers: {
      Authorization: `Bearer ${await jwt()}`
    },
    data
  })
    .then(res => res.data.data)
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

function findUser(id) {
  return axios.get(`http://api:3000/api/v1/user/${id}`)
    .then(res => res.data.data[0]);
}
