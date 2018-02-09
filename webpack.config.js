const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: 'bundle.js',
  },
  module: {
    rules: [
      {
        exclude: [
          /node_modules/,
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
        ],
        loader: 'url',
      }, {
        test: /\.(css)?$/,
        include: __dirname + '/src',
        loaders: ExtractTextPlugin.extract('css-loader'),
      }, {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        include: [/(src)/],
        query: {
          presets: ['env'],
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
  ],
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
