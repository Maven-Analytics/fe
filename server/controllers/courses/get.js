const axios = require('axios');
const {fromJS} = require('immutable');

const {getCourses, getCourseProgress} = require('../../utils/contentful');

module.exports = async request => {
  try {
    const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;

    let courses = await getCourses({});

    let enrollments;
    if (id) {
      enrollments = await getEnrollments(id);
      courses = courses
        .map(c => getCourseProgress(fromJS(c), fromJS(enrollments)))
        .filter(c => c);
    }

    return {
      success: true,
      data: courses
    };
  } catch (error) {
    return error;
  }
};

function getEnrollments(id) {
  return axios.get(`${process.env.HOST_API}/api/v1/dashboard/progress`, {
    params: {
      user_id: id
    }
  })
    .then(res => res.data.data.enrollments);
}
