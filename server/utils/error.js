const Boom = require('boom');

module.exports = {
  handleApiError
};

function handleApiError(err) {
  if (err.response && err.response.data) {
    throw new Boom(err.response.data.message, err.response.data);
  } else {
    throw Boom.boomify(err, {
      message: err.message
    });
  }
}
