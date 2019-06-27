
const jwt = require('jsonwebtoken');
const axios = require('axios');

const {handleApiError} = require('./error');

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
  getLoginToken,
  getSsoUrl,
  login,
  apiLogin,
  logout,
  COOKIE_OPTIONS
};

async function logout(h) {
  return h
    .response({
      success: true
    });
}

async function apiLogin(email, password) {
  return axios.post(`${process.env.HOST_API}/api/v1/auth/login`, {
    email,
    password
  })
    .then(res => res.data.data.user)
    .catch(handleApiError);
}

async function login(h, user, redirectTo) {
  let ssoUrl = await getSsoUrl(user, redirectTo);
  let token = await getLoginToken(user);

  return h.response({
    success: true,
    data: {
      user,
      ssoUrl,
      token
    }
  });
}

async function getSsoUrl(user, redirectTo) {
  const token = await signThinkificToken(user);

  const url = `https://${process.env.THINKIFIC_SUBDOMAIN}.thinkific.com/api/sso/v2/sso/jwt?jwt=${token}&return_to=${redirectTo || 'http://mavenanalytics.io'}`;

  return url;
}

async function signThinkificToken(user) {
  return jwt.sign({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name
  }, process.env.THINKIFIC_API_KEY, {algorithm: 'HS256', expiresIn: '7d'});
}

async function getLoginToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name
  }, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '7d'});
}
