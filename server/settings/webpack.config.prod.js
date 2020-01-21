const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const rootFolder = path.join(__dirname, '..', '..');
const clientConfig = require(path.join(rootFolder, 'client', 'config.js'));

module.exports = {
    devtool: 'source-map',
    entry: [
        './client/index.js'
    ],
    mode: 'production',
    performance: { // false just to avoid a few tips which will be taken care of later
        hints: false
    },
    output: {
        path: path.join(rootFolder, 'public'),
        publicPath: '/',
        filename: 'bundle.[chunkhash].js'
    },
    plugins: [
        new WebpackMd5Hash(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                cache: true,
                parallel: true,
                sourceMap: false,
                terserOptions: {
                  // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                   extractComments: 'all',
                   compress: {
                       drop_console: true,
                   },
            }
              }),
        ],
      },
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
    externals: {
        'config': JSON.stringify(clientConfig)
    }
};