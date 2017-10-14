import * as webpack from 'webpack';
import { resolve } from 'path';

const config: webpack.Configuration = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: resolve(__dirname, 'build'),
  },
  // externals: {
  //   'aws-sdk': 'aws-sdk',
  // },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
export default config;
