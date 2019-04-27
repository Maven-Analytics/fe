const withSass = require('@zeit/next-sass');
module.exports = withSass({
  env: {
    APP_URL: process.env.APP_URL || 'http://localhost:3000'
  },
  webpackDevMiddleware: config => {
    // Solve compiling problem via vagrant
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    };
    return config;
  },
  distDir: '../.next'
});
