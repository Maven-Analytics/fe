import nookies from 'nookies';

const cookieConfig = {
  maxAge: 30 * 24 * 60 * 60,
  path: ''
};

export const setCookie = (key, value, ctx = {}) => {
  return nookies.set(ctx, key, value, cookieConfig);
};

export const removeCookie = (key, ctx = {}) => {
  return nookies.destroy(ctx, key);
};

export const getCookie = (key, ctx = {}) => {
  const cookies = nookies.get(ctx);
  return cookies[key];
};
