/* tslint:disable: variable-name max-line-length */
/**
 * Try to not make your own edits to this file, use the constants folder instead.
 * If more constants should be added file an issue or create PR.
 */
import 'ts-helpers';

import {
  DEV_PORT,
  API_HOST,
  API_PORT,
  API_BASE_URL,
  EXCLUDE_SOURCE_MAPS,
  HOST,
  DEV_SERVER_WATCH_OPTIONS,
  DEV_SOURCE_MAPS,
  PROD_SOURCE_MAPS
} from './constants';

const {
  DefinePlugin,
  DllPlugin,
  DllReferencePlugin,
  ProgressPlugin,
  NoEmitOnErrorsPlugin
} = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge = require('webpack-merge');
const {getAotPlugin} = require('./webpack.aot');

const {hasProcessFlag, includeClientPackages, root, testDll} = require('./helpers.js');

const EVENT = process.env.npm_lifecycle_event || '';
const DEV_SERVER = EVENT.includes('webdev');
const DLL = EVENT.includes('dll');
const PROD = EVENT.includes('prod');

console.log('PRODUCTION BUILD: ', PROD);
console.log('AOT: ', PROD);
if (DEV_SERVER) {
  testDll();
  console.log(`Starting dev server on: http://${HOST}:${DEV_PORT}`);
}

const CONSTANTS = {
  DEV_SERVER: DEV_SERVER,
  ENV: PROD ? JSON.stringify('PROD') : JSON.stringify('DEV'),
  API_HOST: JSON.stringify(API_HOST),
  API_PORT: JSON.stringify(API_PORT),
  API_BASE_URL: JSON.stringify(API_BASE_URL)
};

const DLL_VENDORS = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  '@ngrx/core',
  '@ngrx/core/add/operator/select.js',
  '@ngrx/effects',
  '@ngrx/router-store',
  '@ngrx/store',
  '@ngrx/store-devtools',
  '@ngrx/store-log-monitor',
  'ngrx-store-freeze',
  'ngrx-store-logger',
  'rxjs'
];

const COPY_FOLDERS = [
  {from: 'src/assets', to: 'assets'},
  {from: 'node_modules/hammerjs/hammer.min.js'},
  {from: 'node_modules/hammerjs/hammer.min.js.map'},
  {from: 'src/app/styles/styles.css'}
];

if (DEV_SERVER) {
  COPY_FOLDERS.push({from: 'dll'});
} else {
  COPY_FOLDERS.unshift({from: 'src/index.html'});
}

const commonConfig = function webpackConfig(): WebpackConfig {
  let config: WebpackConfig = Object.assign({});

  config.module = {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [EXCLUDE_SOURCE_MAPS]
      },
      {
        test: /\.ts$/,
        loaders: !DLL && !DEV_SERVER ? ['@ngtools/webpack'] : [
          'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
          'angular2-template-loader',
          'angular-router-loader?loader=system&genDir=compiled&aot=' + PROD
        ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')]},
      {test: /\.css$/, loader: 'raw-loader'},
      {
        test: /\.scss$/,
        loaders: ['to-string-loader', 'css-loader', 'sass-loader']
      }
    ]
  };

  config.plugins = [
    new ProgressPlugin(),
    new CheckerPlugin(),
    new DefinePlugin(CONSTANTS),
    new NamedModulesPlugin()
  ];

  if (DEV_SERVER) {
    config.plugins.push(
      new DllReferencePlugin({
        context: '.',
        manifest: require(`./dll/polyfill-manifest.json`)
      }),
      new DllReferencePlugin({
        context: '.',
        manifest: require(`./dll/vendor-manifest.json`)
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: false
      })
    );
  }

  if (DLL) {
    config.plugins.push(
      new DllPlugin({
        name: '[name]',
        path: root('dll/[name]-manifest.json'),
      })
    );
  } else {
    config.plugins.push(
      new CopyWebpackPlugin(COPY_FOLDERS)
    );
  }

  if (PROD) {
    config.plugins.push(
      new NoEmitOnErrorsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    );
  }

  return config;
}();

// type definition for WebpackConfig at the bottom
const clientConfig = function webpackConfig(): WebpackConfig {

  let config: WebpackConfig = Object.assign({});

  config.cache = true;
  config.target = 'web';
  PROD ? config.devtool = PROD_SOURCE_MAPS : config.devtool = DEV_SOURCE_MAPS;
  config.plugins = [getAotPlugin('client', PROD)];

  /*if (PROD) {
    config.plugins.push(
      new UglifyJsPlugin({
        beautify: false,
        comments: false
      })
    );
  }*/

  if (DLL) {
    config.entry = {
      app_assets: ['./src/main.browser'],
      polyfill: [
        'sockjs-client',
        'ts-helpers',
        'zone.js',
        'core-js/client/shim.js',
        'core-js/es6/reflect.js',
        'core-js/es7/reflect.js',
        'querystring-es3',
        'strip-ansi',
        'url',
        'punycode',
        'events',
        'web-animations-js/web-animations.min.js',
        'webpack-dev-server/client/socket.js',
        'webpack/hot/emitter.js',
        'zone.js/dist/long-stack-trace-zone.js'
      ],
      vendor: [...DLL_VENDORS]
    };
  } else {
    config.entry = {
      main: root('./src/main.browser.ts')
    };
  }

  if (DLL) {
    config.output = {
      path: root('dll'),
      filename: '[name].dll.js',
      library: '[name]'
    };
  } else {
    config.output = {
      path: root('dist'),
      filename: 'index.js'
    };
  }

  config.devServer = {
    contentBase: PROD ? './compiled' : './src',
    port: DEV_PORT,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    host: '0.0.0.0',
    watchOptions: DEV_SERVER_WATCH_OPTIONS
  };

  config.performance = {
    hints: false
  };

  config.node = {
    global: true,
    process: true,
    Buffer: false,
    crypto: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    clearTimeout: true,
    setTimeout: true
  };

  return config;
}();

const defaultConfig = {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};

DLL ? console.log('BUILDING DLLs') : console.log('BUILDING APP');
module.exports = webpackMerge({}, defaultConfig, commonConfig, clientConfig);
