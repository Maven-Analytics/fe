const axios = require('axios');
const {fromJS} = require('immutable');

const {getPaths, getPathProgress} = require('../../utils/contentful');

module.exports = async request => {
  try {
    const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;

    let paths = await getPaths({});

    let enrollments;
    if (id) {
      enrollments = await getEnrollments(id);
      paths = paths.map(p => getPathProgress(fromJS(p), fromJS(enrollments))).filter(c => c);
    }

    return {
      success: true,
      data: paths
    };
  } catch (error) {
    return error;
  }
};

function getEnrollments(id) {
  return axios
    .get(`${process.env.HOST_API}/api/v1/dashboard/progress`, {
      params: {
        user_id: id
      }
    })
    .then(res => res.data.data.enrollments);
}
