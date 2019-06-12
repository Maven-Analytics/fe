const {logout} = require('../../utils/auth');

module.exports = async (request, h) => {
  console.log('logout');
  return logout(h);
};
