const axios = require('axios');

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
  console.log('decoded', decoded);
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
  return axios.get(`${process.env.API_HOST}/api/v1/user/?email=${email}`)
    .then(res => res.data.data[0]);
}
