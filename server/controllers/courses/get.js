const axios = require('axios');
const {fromJS, List} = require('immutable');

const {getCourses, getCourseProgress} = require('../../utils/contentful');

module.exports = async request => {
  try {
    const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;

    const query = request.query;
    const enrollmentFilter = query.enrollmentFilter ? fromJS(query.enrollmentFilter.split(',')) : null;
    delete query.enrollmentFilter;

    let courses = await getCourses({query});

    courses = fromJS(courses)
      .sort((a, b) => (b.get('surveyWeight') || 0 * 1000) - (a.get('surveyWeight') || 0 * 1000));

    let enrollments;
    if (id) {
      enrollments = await getEnrollments(id);
      courses = courses
        .map(c => getCourseProgress(fromJS(c), fromJS(enrollments)))
        .filter(c => c)
        .sort((a, b) => b.get('percentage_completed') - a.get('percentage_completed'));
    }

    // If the enrollmentFilter is set, only show courses that meet the status passed in
    if (enrollmentFilter) {
      courses = courses
        .filter(c => List.isList(enrollmentFilter) ? enrollmentFilter.contains(c.get('status')) : enrollmentFilter === c.get('status'));
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
