const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
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
