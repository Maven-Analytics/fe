const Joi = require('@hapi/joi');

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
        method: 'GET',
        path: '/reset/{token}',
        config: {
          auth: false
        },
        handler: pathWrapper(app, '/reset')
      });

      server.route({
        method: 'GET',
        path: '/path/{id}',
        config: {
          auth: false
        },
        handler: pathWrapper(app, '/path')
      });

      server.route({
        method: 'GET',
        path: '/course/{id}',
        config: {
          auth: false
        },
        handler: pathWrapper(app, '/course')
      });

      server.route({
        method: 'GET',
        path: '/api/v1/ping',
        config: {
          auth: false,
          handler: () => {
            return {
              pong: true,
              service: 'fe'
            };
          }
        }
      });

      server.route({
        method: 'POST',
        path: '/api/v1/login',
        options: {
          auth: false,
          validate: {
            payload: {
              email: Joi.string().email().required(),
              password: Joi.string().required(),
              redirectTo: Joi.string().required()
            }
          }
        },
        handler: require('./controllers/auth/login')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/sso',
        options: {
          validate: {
            payload: {
              redirectTo: Joi.string().required()
            }
          }
        },
        handler: require('./controllers/auth/sso')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/reset',
        options: {
          auth: false,
          validate: {
            payload: {
              email: Joi.string().email().required(),
              password: Joi.string().required(),
              token: Joi.string().required()
            }
          }
        },
        handler: require('./controllers/auth/reset')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/forgot',
        options: {
          auth: false,
          validate: {
            payload: {
              email: Joi.string().email().required()
            }
          }
        },
        handler: require('./controllers/auth/forgot')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/logout',
        options: {
          auth: {
            mode: 'try'
          }
        },
        handler: require('./controllers/auth/logout')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/register',
        options: {
          auth: false,
          validate: {
            payload: {
              email: Joi.string().email().required(),
              password: Joi.string().required(),
              first_name: Joi.string().required(),
              last_name: Joi.string().required(),
              country: Joi.string().required(),
              postal_code: Joi.number().integer().required(),
              redirectTo: Joi.string().required(),
              recommended_paths: Joi.array(),
              recommended_courses: Joi.array()
            }
          }
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
        method: 'PUT',
        path: '/api/v1/checkout',
        options: {
          auth: {
            mode: 'try'
          },
          validate: {
            payload: {
              plan: Joi.object().keys({
                id: Joi.any().required(),
                checkoutUrl: Joi.string().required()
              })
            }
          }
        },
        handler: require('./controllers/checkout/update')
      });

      server.route({
        method: 'GET',
        path: '/api/v1/checkout/{token}',
        options: {
          auth: {
            mode: 'try'
          }
        },
        handler: require('./controllers/checkout/get')
      });

      server.route({
        method: 'PUT',
        path: '/api/v1/account/profile',
        handler: require('./controllers/account/profile')
      });

      server.route({
        method: 'PUT',
        path: '/api/v1/account/password',
        handler: require('./controllers/account/password')
      });

      server.route({
        method: 'GET',
        path: '/api/v1/dashboard/progress',
        handler: require('./controllers/dashboard/progress')
      });

      server.route({
        method: 'POST',
        path: '/api/v1/user/recommended',
        handler: require('./controllers/user/recommended'),
        config: {
          auth: {
            mode: 'required'
          },
          validate: {
            payload: {
              paths: Joi.array().required(),
              courses: Joi.array().required()
            }
          }
        }
      });

      server.route({
        method: 'GET',
        path: '/api/v1/courses',
        handler: require('./controllers/courses/get'),
        config: {
          auth: {
            mode: 'try'
          }
        }
      });

      server.route({
        method: 'GET',
        path: '/api/v1/paths',
        handler: require('./controllers/paths/get'),
        config: {
          auth: {
            mode: 'try'
          }
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
