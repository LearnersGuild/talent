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
          /\.scss$/,
          /\.css$/,
          /\.json$/
        ],
        loader: 'url',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }, {
        test: /\.(css|scss)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
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
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    port: 8081
  }
};
