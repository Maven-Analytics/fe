const Boom = require('@hapi/boom');

module.exports = {
  handleApiError
};

function handleApiError(err) {
  console.log(err);
  if (err.response && err.response.data && err.response.data.message) {
    throw new Boom(err.response.data.message, err.response.data);
  } else {
    throw Boom.boomify(err, {
      message: err.message
    });
  }
}
