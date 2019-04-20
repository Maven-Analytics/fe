const {User} = require('mv-models');

module.exports = async request => {
  const id = request.auth && request.auth.credentials ? request.auth.credentials.id : null;

  if (!id) {
    return {
      success: false
    };
  }

  let user = await User.findOne({
    where: {
      id: request.auth.credentials.id
    }
  });

  return {
    success: true,
    data: {
      token: request.auth.token,
      user: user.safeReturn()
    }
  };
};
