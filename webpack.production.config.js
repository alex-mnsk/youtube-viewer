const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            'whatwg-fetch',
            path.resolve(__dirname, 'src/js/app.js')
        ]
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, './src/dist'),
        filename: 'app.bundle.js'
    },
    watch: true,
    plugins: [
        definePlugin,
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.UglifyJsPlugin({
        drop_console: true,
        minimize: true,
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
        })
    ],
    node: {
      dns: 'mock',
      net: 'mock'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'js') },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                plugins: ['lodash'],
                presets: ['es2015']
            }},
            {  test: /\.jsx?$/,
              loader: 'eslint-loader',
              include: path.resolve(process.cwd(), 'src/js'),
              enforce: 'pre',
              options: {
                fix: true,
              }
          }
        ]
    }
}

