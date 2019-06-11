const {updateCheckout} = require('../../utils/checkout');

module.exports = async (request, h) => {
  const userId = request.auth && request.auth.credentials ? request.auth.credentials.id : null;
  let data = request.payload;

  try {
    return updateCheckout(h, data, userId);
  } catch (error) {
    return error;
  }
};
