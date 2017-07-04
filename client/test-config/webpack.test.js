/**
 * @authors: @qdouble and @AngularClass
 */
const webpack = require('webpack');
const root = require('../helpers').root;

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  DEV_PORT,
  API_HOST,
  API_PORT,
  API_BASE_URL,
  EXCLUDE_SOURCE_MAPS,
  HOST,
  DEV_SERVER_WATCH_OPTIONS,
  DEV_SOURCE_MAPS,
  PROD_SOURCE_MAPS
} = require('../constants');

const COPY_FOLDERS = [
    {from: 'src/assets', to: 'assets'},
    {from: 'node_modules/hammerjs/hammer.min.js'},
    {from: 'node_modules/hammerjs/hammer.min.js.map'},
    {from: 'src/app/styles/styles.css'}
];

const EVENT = process.env.npm_lifecycle_event || '';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

    /**
     * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
     *
     * Do not change, leave as is or it wont work.
     * See: https://github.com/webpack/karma-webpack#source-maps
     */
    devtool: 'eval',

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

        /**
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['.ts', '.js']

    },

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

        /**
         * An array of applied pre and post loaders.
         *
         * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
         */
        rules: [

            /**
             * Tslint loader support for *.ts files
             *
             * See: https://github.com/wbuchwalter/tslint-loader
             */
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                exclude: [root('node_modules')]
            },

            /**
             * Source map loader support for *.js files
             * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
             *
             * See: https://github.com/webpack/source-map-loader
             */
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
                exclude: [EXCLUDE_SOURCE_MAPS]
            },

            /**
             * Typescript loader support for .ts and Angular 2 async routes via .async.ts
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader?sourceMap=false,inlineSourceMap=true,compilerOptions{}=removeComments:true',
                    'angular2-template-loader'
                ],
                exclude: [/\.e2e\.ts$/]
            },

            /**
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {test: /\.json$/, loader: 'json-loader', exclude: [root('src/index.html')]},

            {test: /\.(png|jpg)$/, loader: 'null-loader'},

            /**
             * Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {test: /\.html$/, loader: 'raw-loader', exclude: [root('src/index.html')]},

            /**
             * Instruments JS files with Istanbul for subsequent code coverage reporting.
             * Instrument only testing sources.
             *
             * See: https://github.com/deepsweet/istanbul-instrumenter-loader
             */
            {
                test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
                enforce: 'post',
                include: root('src'),
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }, {
                test: /\.scss$/,
                loaders: ['to-string-loader', 'css-loader?url=false', 'sass-loader']
            }
        ]
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src')
        ),
        /**
         * Plugin: DefinePlugin
         * Description: Define free variables.
         * Useful for having development builds with debug logging or adding global constants.
         *
         * Environment helpers
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
         */
        // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
        new DefinePlugin({
            ENV: JSON.stringify('TEST'),
            API_HOST: JSON.stringify(API_HOST),
            API_PORT: JSON.stringify(API_PORT),
            API_BASE_URL: JSON.stringify(API_BASE_URL)
        }),
        new CopyWebpackPlugin(COPY_FOLDERS),
        new NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: false,
                    failOnHint: false,
                    resourcePath: root('./src')
                }
            }
        })
    ],

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: true,
        process: false,
        crypto: false,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
