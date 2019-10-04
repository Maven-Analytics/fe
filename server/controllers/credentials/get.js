const axios = require('axios');

module.exports = async request => {
  const email = request.auth && request.auth.credentials ? request.auth.credentials.email : null;

  const query = request.query ? request.query : {};

  return {
    success: true,
    data: await getAssessments(email, query)
  };
};

function getAssessments(recipient_email, query) {
  return axios
    .get(`${process.env.HOST_API}/api/v1/credential`, {
      params: {
        recipient_email,
        ...query
      }
    })
    .then(res => res.data.data);
}
