const path = require('path');
module.exports = {
  // define entry file and output
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
  },
  // define babel loader
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
  },
};
