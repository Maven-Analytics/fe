const axios = require('axios');
const jwt = require('./jwt');

module.exports = async email => {
  await makeRequest('/webhooks/v1/accredibleSync', email);
  await makeRequest('/webhooks/v1/thinkificEnrollmentSync', email);

  return true;
}

async function makeRequest(url, email) {
  return axios({
    baseURL: process.env.API_HOST,
    url,
    method: 'post',
    headers: {
      Authorization: `Bearer ${await jwt()}`
    },
    data: {
      email
    }
  })
    .then(res => res.data);
}
