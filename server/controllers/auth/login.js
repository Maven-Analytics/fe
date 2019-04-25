const Boom = require('boom');
const {User} = require('mv-models');
const {login} = require('../../utils/auth');
const userSync = require('../../utils/userSync');

module.exports = async (request, h) => {
  let data = request.payload;

  try {
    data = validate(data);

    let user = await findUser(data);
    user = await user.login(data.password);
    await userSync(user.email);

    return login(h, user, data.redirectTo);
  } catch (error) {
    return error;
  }
};

function validate(data) {
  if (!data.email || data.email === '' || !data.password || data.password === '') {
    throw Boom.badRequest('Email & password are required.');
  }

  return data;
}

async function findUser(data) {
  const user = await User.findOne({
    where: {
      email: data.email
    }
  });

  if (user) {
    return user;
  }

  throw Boom.notFound(`User with email ${data.email} not found`);
}
