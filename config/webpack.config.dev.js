const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, '..', 'src'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
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
            loader: 'style-loader!css-loader'
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