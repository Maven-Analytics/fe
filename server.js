const Hapi = require('hapi');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || 3000, 10);

if (dev) {
  require('dotenv').config();
}

const app = next({dev, dir: 'src'});

const server = Hapi.server({
  port,
  router: {stripTrailingSlash: true},
  routes: {
    cors: {
      origin: [process.env.ORGINS || '*'],
      additionalHeaders: ['Authorization']
    }
  }
});

app.prepare().then(async () => {
  try {
    await server.register([
      require('./server/auth'),
      require('./server/routes')(app)
    ]);
    await server.start();
    console.log(`> Ready on http://localhost:${port}`);
  } catch (error) {
    console.log('Error starting server');
    console.log(error);
  }
});
