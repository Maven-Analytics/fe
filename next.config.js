const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = withPlugins(
  [
    withSass
  ], {
    env: {
      APP_URL: process.env.APP_URL || 'http://localhost:3000',
      HOST_SELF: process.env.HOST_SELF || 'http://maven.info:3000',
      THINKIFIC_SUBDOMAIN: process.env.THINKIFIC_SUBDOMAIN || 'mavenanalytics'
    },
    webpack: (config, {isServer}) => {
      if (isServer) {
        return config;
      }

      var isProduction = config.mode === 'production';

      if (isProduction) {
        config.plugins.push(
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
          })
        );

        config.optimization.minimizer.push(
          new OptimizeCSSAssetsPlugin({})
        );
      }

      return config;
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
  }
);
