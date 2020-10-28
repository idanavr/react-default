const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rootFolder = path.join(__dirname, '..', '..');
const clientConfig = require(path.join(rootFolder, 'client', 'config.js'));

module.exports = {
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './client/index.js'
    ],
    mode: 'development',
    devtool: 'eval-source-map',
    performance: { // false just to avoid a few tips which will be taken care of later
        hints: false
    },
    output: {
        path: path.join(rootFolder, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        stats: 'minimal',
        overlay: true,
        noInfo: true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            favicon: 'client/assets/images/favicon.ico',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    module: {
        rules:
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
                test: /\.(s?css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(ico||ttf||eot||woff||woff2||svg)$/,
                loader: 'url-loader'
            }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {
        'config': JSON.stringify(clientConfig)
    }
};