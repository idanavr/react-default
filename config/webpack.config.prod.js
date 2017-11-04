const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log(path.join(__dirname, '..', 'dist'));
module.exports = {
    devtool: 'source-map',
    entry: [
            './src/index.js'
        ],
    output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({

            output: {
                comments: false,
            },

            compress: {
                warnings: false,
                drop_console: true
            },

        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    module: {
        loaders: // start loaders
        [{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader'
        },
        {
            exclude: /node_modules/,
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        }] // end loaders
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};