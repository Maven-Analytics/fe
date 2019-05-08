const axios = require('axios');
const {handleApiError} = require('../../utils/error');

module.exports = async request => {
  let data = request.payload;
  const email = data.email;

  try {
    await forgot(email);

    return {
      success: true,
      data: {
        message: `A password reset email has been sent to ${email}.`
      }
    };
  } catch (error) {
    return error;
  }
};

async function forgot(email) {
  return axios.post('http://api:3000/api/v1/user/forgot', {
    email
  })
    .then(res => res.data)
    .catch(handleApiError);
}
