const userSync = require('../../utils/userSync');

module.exports = async request => {
  const email = request.auth.credentials ? request.auth.credentials.email : null;

  if (!email) {
    return {
      success: false
    };
  }

  await userSync(email);

  return {
    success: true
  };
}
