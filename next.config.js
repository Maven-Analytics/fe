const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = withPlugins(
  [
    withSass
  ], {
    env: {
      HOST_APP: process.env.HOST_APP,
      THINKIFIC_SUBDOMAIN: process.env.THINKIFIC_SUBDOMAIN
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
