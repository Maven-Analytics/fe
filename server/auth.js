const axios = require('axios');

const {handleApiError} = require('./utils/error');

module.exports = {
  name: 'auth',
  register: async server => {
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_SECRET,
      validate: validate,
      verifyOptions: {
        ignoreExpiration: true,
        algorithms: ['HS256']
      }
    });

    server.auth.default('jwt');
  }
};

async function validate(decoded) {
  if (!decoded || !decoded.email || decoded.email === '') {
    return {isValid: false};
  }

  const user = await getUser(decoded.email);

  if (!user) {
    return {isValid: false};
  }

  return {isValid: true};
}

function getUser(email) {
  return axios.get(`${process.env.HOST_API}/api/v1/user/?email=${email}`)
    .then(res => res.data.data[0])
    .catch(handleApiError);
}
