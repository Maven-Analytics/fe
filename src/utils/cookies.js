import nookies, {parseCookies} from 'nookies';

const cookieConfig = {
  maxAge: 30 * 24 * 60 * 60,
  path: '/'
};

export const setCookie = (key, value, ctx = {}) => {
  return nookies.set(ctx, key, JSON.stringify(value), cookieConfig);
};

export const removeCookie = (key, ctx = {}) => {
  return nookies.destroy(ctx, key);
};

export const getCookie = (key, ctx = {}) => {
  let cookies = {};

  if (ctx.isServer) {
    cookies = nookies.get(ctx);
  } else {
    cookies = parseCookies({});
  }

  const value = cookies[key];

  return value ? JSON.parse(value) : value;
};
