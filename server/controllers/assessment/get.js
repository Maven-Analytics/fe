const axios = require('axios');

module.exports = async request => {
  const email = request.auth && request.auth.credentials ? request.auth.credentials.email : null;

  const course_id = request.query ? request.query.course_id : null;

  return {
    success: true,
    data: await getAssessments(email, course_id)
  };
};

function getAssessments(email, course_id) {
  return axios.get(`${process.env.HOST_API}/api/v1/assessment`, {
    params: {
      email,
      course_id
    }
  })
    .then(res => res.data.data);
}
