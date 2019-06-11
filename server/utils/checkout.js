
const jwt = require('jsonwebtoken');

const COOKIE_OPTIONS = {
  ttl: 365 * 24 * 60 * 60 * 1000,
  encoding: 'none',
  isSecure: false,
  isHttpOnly: true,
  clearInvalid: true,
  strictHeader: true,
  path: '/'
};

module.exports = {
  updateCheckout,
  removeCheckout,
  getCheckout,
  COOKIE_OPTIONS
};

async function removeCheckout(h) {
  return h
    .response({
      success: true
    })
    .unstate('checkout', COOKIE_OPTIONS);
}

async function getCheckout(checkoutToken) {
  const decoded = jwt.decode(checkoutToken);

  return decoded;
}

async function updateCheckout(h, plan, userId) {
  let token = await signCheckoutToken(plan, userId);

  return h.response({
    success: true,
    data: {
      token
    }
  });
}

async function signCheckoutToken(plan, userId) {
  const tokenData = Object.assign({}, plan, {
    userId: userId ? userId : undefined
  });

  return jwt.sign(tokenData, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '7d'});
}
