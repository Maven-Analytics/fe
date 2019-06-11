const {getCheckout} = require('../../utils/checkout');

module.exports = async request => {
  try {
    const checkout = await getCheckout(request.params.token);
    return {
      success: true,
      data: checkout
    };
  } catch (error) {
    return error;
  }
};
