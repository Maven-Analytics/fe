const {pathWrapper, defaultHandlerWrapper, nextHandlerWrapper} = require('./nextWrapper');

module.exports = app => {
  return {
    name: 'routes',
    register: async server => {
      server.route({
        method: 'GET',
        path: '/home',
        config: {
          auth: false
        },
        handler: pathWrapper(app, '/')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/login',
        config: {
          auth: false
        },
        handler: require('./controllers/auth/login')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/logout',
        config: {
          auth: {
            mode: 'try'
          }
        },
        handler: require('./controllers/auth/logout')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/register',
        config: {
          auth: false
        },
        handler: require('./controllers/auth/register')
      });

      server.route({
        method: 'GET',
        path: '/api/v1/me',
        config: {
          auth: {
            mode: 'try'
          }
        },
        handler: require('./controllers/auth/me')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/userSync',
        handler: require('./controllers/user/sync')
      });

      server.route({
        method: 'GET',
        path: '/private',
        handler: () => {
          return {
            text: 'here'
          };
        }
      });

      server.route({
        method: 'GET',
        path: '/_next/{p*}' /* next specific routes */,
        handler: nextHandlerWrapper(app),
        config: {
          auth: false
        }
      });

      server.route({
        method: 'GET',
        path: '/static/{p*}' /* use next to handle static files */,
        handler: nextHandlerWrapper(app),
        config: {
          auth: false
        }
      });

      server.route({
        method: 'GET',
        path: '/{p*}' /* catch all route */,
        config: {
          auth: false
        },
        handler: defaultHandlerWrapper(app)
      });
    }
  };
};
