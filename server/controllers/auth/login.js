const axios = require('axios');
const {login} = require('../../utils/auth');
const {runSync} = require('../../utils/user');
const {handleApiError} = require('../../utils/error');

module.exports = async (request, h) => {
  let data = request.payload;

  try {
    let user = await auth(data.email, data.password);

    runSync(user);

    return login(h, user, `${process.env.HOST_APP}/about`);
  } catch (error) {
    return error;
  }
};

async function auth(email, password) {
  return axios.post('http://api:3000/api/v1/auth', {
    email,
    password
  })
    .then(res => res.data.data.user)
    .catch(handleApiError);
}
