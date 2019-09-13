const axios = require('axios');
const {runSync} = require('../../utils/user');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;

  if (!id) {
    return {
      success: false
    };
  }

  const user = await getUser(id);
  const enrollments = await getEnrollments(id);

  if (enrollments.length) {
    user.enrolled = true;
  }

  runSync(user);

  return {
    success: true,
    data: {
      token: user ? request.auth.token : null,
      user
    }
  };
};

function getUser(id) {
  return axios.get(`${process.env.HOST_API}/api/v1/user/${id}`)
    .then(res => res.data.data[0]);
}

function getEnrollments(user_id) {
  return axios.get(`${process.env.HOST_API}/api/v1/enrollment`, {
    params: {
      user_id,
      expired: false
    }
  })
    .then(res => res.data.data);
}
