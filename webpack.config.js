const webpack = require('webpack');
const path = require('path');

module.exports = (env) => ({
  entry: './client/index.jsx',
  output: {
    filename: 'bundle-reviews-service.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify(`${env.API_URL}`) }),
  ],
});
