const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rootFolder = path.join(__dirname, '..', '..');
const clientConfig = require(path.join(rootFolder, 'client', 'config.js'));

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './client/index.js'
    ],
    mode: 'development',
    performance: { // false just to avoid a few tips which will be taken care of later
        hints: false
    },
    output: {
        path: path.join(rootFolder, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin('main.css'),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            favicon: 'client/assets/images/favicon.ico',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: // start loaders
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
                test: /\.(css)$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                ],
              },
            {
                test: /\.(ico||ttf||eot||woff||woff2||svg)$/,
                loader: 'url-loader'
            }] // end loaders
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './',
        port: 3000
    },
    externals: {
        'config': JSON.stringify(clientConfig)
    }
};