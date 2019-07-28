const axios = require('axios');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;

  const course_id = request.query ? request.query.course_id : null;

  return {
    success: true,
    data: await getAssessments(id, course_id)
  };
};

function getAssessments(user_id, course_id) {
  return axios.get(`${process.env.HOST_API}/api/v1/assessment`, {
    params: {
      user_id,
      course_id
    }
  })
    .then(res => res.data.data);
}
