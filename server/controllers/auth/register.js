const axios = require('axios');
const {login} = require('../../utils/auth');
const {runSync} = require('../../utils/user');
const {handleApiError} = require('../../utils/error');

module.exports = async (request, h) => {
  let data = request.payload;

  const res = await makeRequest(data);
  const user = await findUser(res.id);

  await runSync(user, true);

  return login(h, user, data.redirectTo);
};

async function makeRequest(data) {
  return axios({
    url: `${process.env.HOST_API}/api/v1/user`,
    method: 'post',
    data
  })
    .then(res => res.data.data)
    .catch(handleApiError);
}

function findUser(id) {
  return axios.get(`${process.env.HOST_API}/api/v1/user/${id}`)
    .then(res => res.data.data[0]);
}
