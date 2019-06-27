const boom = require('@hapi/boom');
const axios = require('axios');

const {apiLogin} = require('../../utils/auth');
const {getUserById} = require('../../utils/user');
const {handleApiError} = require('../../utils/error');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;

  const data = request.payload || {};

  await validate(id, data);

  await makeUpdate(id, {
    password: data.newPassword
  });

  return {
    success: true,
    data: {
      message: 'Your password has been reset.'
    }
  };
};

async function validate(id, data) {
  let user = await getUserById(id);

  if (!user) {
    throw boom.notFound('User not found.');
  }

  await apiLogin(user.email, data.currentPassword);

  if (!data.newPassword || data.newPassword === '') {
    throw boom.badData('New password is required.');
  }

  if (data.newPassword.length < 6) {
    throw boom.badData('New password must be at least 6 characters');
  }

  if (data.newPassword !== data.confirmPassword) {
    throw boom.badData('Please confirm your password.');
  }

  return user;
}

async function makeUpdate(id, data) {
  return axios({
    url: `${process.env.HOST_API}/api/v1/user/${id}`,
    method: 'put',
    data
  })
    .then(res => res.data.data)
    .catch(handleApiError);
}
