const path = require('path');

module.exports = {
  entry: './master.ts',
  mode: 'production', // was production
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map', // this has changed
  devServer: {
    static: './',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: './main.js',
    path: path.resolve(__dirname, ''),
  },
  optimization: {
    emitOnErrors: true,
  },
};