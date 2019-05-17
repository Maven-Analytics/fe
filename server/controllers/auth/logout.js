const {logout} = require('../../utils/auth');

module.exports = async (request, h) => {
  return logout(h);
};
