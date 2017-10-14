const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map',
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        // here TypeScript compiles to ESNext and babel transforms to node v6.10
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
