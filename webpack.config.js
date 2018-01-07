const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: [
          /node_modules/,
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/
        ],
        loader: 'url',
      }, {
        test: /\.(css)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
          publicPath: '/public'
        })
      }, {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        include: [/(src|test)/],
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
