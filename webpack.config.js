/* eslint-disable */
const webpack = require('webpack');
const env =  (process.env.NODE_ENV || 'dev').trim();
const isDevMode = env !== "production";
const outPath = isDevMode ? (__dirname + '/dist') : (__dirname + '/public');

module.exports = {
  entry: isDevMode ? [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/index.js'
  ] : [
    './src/index.js'
  ],
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: isDevMode ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ] : [
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
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ],
  module: {
    loaders: // start loaders
    [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0'] // 'stage-0' - needed?
      }
    },
    {
      exclude: /node_modules/,
      test: /\.json$/,
      loader: 'json-loader'
    }
      ,
    {
      test: /\.css$/,
      loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!postcss-loader"
    }] // end loaders
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: './',
    port: 3000
  },
  devtool: "source-map"
};