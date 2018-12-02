const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rootFolder = path.join(__dirname, '..', '..');
const clientConfig = require(path.join(rootFolder, 'client', 'config.js'));

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './client/index.js'
    ],
    output: {
        path: path.join(rootFolder, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            favicon: 'client/assets/images/favicon.ico',
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