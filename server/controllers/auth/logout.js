const {COOKIE_OPTIONS} = require('../../utils/auth');

module.exports = async (request, h) => {
  return h
    .response({
      success: true
    })
    .unstate('token', COOKIE_OPTIONS);
};
