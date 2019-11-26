const axios = require('axios');
const {runSync, userExpired, userIsFreeTrial} = require('../../utils/user');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;
  const user = await getUser(id);

  if (!id || !user) {
    return {
      success: false
    };
  }

  const enrollments = await getEnrollments(id);

  user.expired = userExpired(enrollments);
  user.enrolled = !userExpired(enrollments);
  user.is_free_trial = userIsFreeTrial(enrollments);

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
      user_id
    }
  })
    .then(res => res.data.data);
}
