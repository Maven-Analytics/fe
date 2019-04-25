const withSass = require('@zeit/next-sass');
module.exports = withSass({
  env: {
    APP_URL: process.env.APP_URL || 'http://localhost:3000'
  }
});
