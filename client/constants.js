"use strict";
const root = require('./helpers.js').root;
const ip = require('ip');

exports.HOST = ip.address();
exports.DEV_PORT = 3001;
exports.API_HOST = ip.address();
exports.API_PORT = 3000;
exports.API_BASE_URL = `http://${exports.API_HOST}:${exports.API_PORT}`;

/**
 * These constants set the source maps that will be used on build.
 * For info on source map options, go to:
 * https://webpack.github.io/docs/configuration.html#devtool
 */
exports.DEV_SOURCE_MAPS = 'eval';
exports.PROD_SOURCE_MAPS = 'source-map';

/**
 * Set watch options for Dev Server. For better HMR performance, you can
 * try setting poll to 1000 or as low as 300 and set aggregateTimeout to as low as 0.
 * These settings will effect CPU usage, so optimal setting will depend on your dev environment.
 * https://github.com/webpack/docs/wiki/webpack-dev-middleware#watchoptionsaggregatetimeout
 */
exports.DEV_SERVER_WATCH_OPTIONS = {
  poll: undefined,
  aggregateTimeout: 300,
  ignored: /node_modules/
};

exports.EXCLUDE_SOURCE_MAPS = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/@nguniversal'),
  root('node_modules/rxjs')
];
