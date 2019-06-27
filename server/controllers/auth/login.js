const {login, apiLogin} = require('../../utils/auth');
const {runSync} = require('../../utils/user');

module.exports = async (request, h) => {
  let data = request.payload;

  try {
    let user = await apiLogin(data.email, data.password);

    runSync(user);

    return login(h, user, data.redirectTo);
  } catch (error) {
    return error;
  }
};
