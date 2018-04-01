const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
console.log(path.join(__dirname, '..', '..', 'public'));
module.exports = {
    devtool: 'source-map',
    entry: [
            './client/index.js'
        ],
    output: {
        path: path.join(__dirname, '..', '..', 'public'),
        publicPath: './',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            favicon: 'client/assets/images/favicon.ico',
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
        },
        {
            test: /\.(ico||ttf||eot||woff||woff2||svg)$/,
            loader: 'url-loader'
        }] // end loaders
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};