const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = withPlugins([withSass], {
  // Env: {
  //   HOST_APP: process.env.HOST_APP,
  //   THINKIFIC_SUBDOMAIN: process.env.THINKIFIC_SUBDOMAIN
  // },
  publicRuntimeConfig: {
    HOST_APP: process.env.HOST_APP,
    HOST_SERVER: process.env.HOST_SERVER,
    THINKIFIC_SUBDOMAIN: process.env.THINKIFIC_SUBDOMAIN,
    CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    NODE_ENV: process.env.NODE_ENV
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

      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
    }

    // Config.plugins.push(new webpack.DefinePlugin({
    //   'process.env.HOST_APP': JSON.stringify(process.env.HOST_APP),
    //   'process.env.THINKIFIC_SUBDOMAIN': JSON.stringify(process.env.THINKIFIC_SUBDOMAIN)
    // }));

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
});
