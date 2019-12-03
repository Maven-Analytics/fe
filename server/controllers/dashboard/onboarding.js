const axios = require('axios');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;
  const email = request.auth && request.auth.credentials ? request.auth.credentials.email : null;

  return {
    success: true,
    data: await getOnboarding(id, email)
  };
};

function getOnboarding(id, email) {
  return axios.get(`${process.env.HOST_API}/api/v1/dashboard/onboarding`, {
    params: {
      user_id: id,
      email
    }
  })
    .then(res => res.data.data);
}
