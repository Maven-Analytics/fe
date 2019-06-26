const axios = require('axios');

const {handleApiError} = require('../../utils/error');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;
  let data = request.payload || {};

  const user = await getUser(id);

  data = Object.assign(user, {
    recommended_paths: data.paths,
    recommended_courses: data.courses,
    updatedAt: new Date()
  });

  const res = await makeRequest(id, data);

  return {
    success: true,
    data: {
      user: res,
      message: 'Your profile has been updated!'
    }
  };
};

async function getUser(id) {
  return axios.get(`${process.env.HOST_API}/api/v1/user/${id}`)
    .then(res => res.data.data[0]);
}

async function makeRequest(id, data) {
  return axios({
    url: `${process.env.HOST_API}/api/v1/user/${id}`,
    method: 'put',
    data
  })
    .then(res => res.data.data)
    .catch(handleApiError);
}
