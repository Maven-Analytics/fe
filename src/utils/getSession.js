import cookie from 'cookie';

const getSession = (ctx, options = {}) => {
  const cookies = cookie.parse(
    ctx && ctx.req ? ctx.req.headers.cookie || {} : typeof document === 'undefined' ? '' : document.cookie,
    options
  );

  return cookies.session;
};

export default getSession;
