const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './client/index.js'
    ],
    output: {
        path: path.join(__dirname, '..', '..', 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
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
            test: /\.(ttf||eot||woff||woff2||svg)$/,
            loader: 'url-loader'
        }] // end loaders
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './',
        port: 3000
    }
};