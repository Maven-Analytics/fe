require('@babel/polyfill');

const Hapi = require('hapi');
const next = require('next');
const Boom = require('@hapi/boom');
const axios = require('axios');
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || 5000, 10);

// If (dev) {
//   require('dotenv').config();
// }

axios.defaults.headers.common.Authorization = process.env.API_KEY;

const app = next({dev, dir: 'src'});

const server = Hapi.server({
  port,
  router: {stripTrailingSlash: true},
  routes: {
    cors: {
      origin: [process.env.ORGINS || '*'],
      additionalHeaders: ['Authorization']
    },
    validate: {
      failAction: async (request, h, err) => {
        if (!dev) {
          // In prod, log a limited error message and throw the default Bad Request error.
          console.error('ValidationError:', err.message);
          throw Boom.badRequest('Invalid request payload input');
        }

        // During development, log and respond with the full error.
        console.error(err);
        throw err;
      }
    }
  }
});

app.prepare().then(async () => {
  try {
    if (!dev) {
      await server.register({
        plugin: require('hapi-require-https'),
        options: {}
      });

      await server.register({
        plugin: require('hapi-sentry'),
        options: {
          scope: {
            tags: [
              {
                name: 'environment',
                value: 'production'
              }
            ]
          },
          client: {
            dsn: 'https://434c351258864811b971abf940ed32e0@sentry.io/1843596'
          }
        }
      });
    }

    await server.register([
      require('./server/auth'),
      require('./server/routes')(app)
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (error) {
    console.log('Error starting server');
    console.log(error);
  }
});
