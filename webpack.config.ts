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
        exclude: /node_modules/,
        // here TypeScript compiles to ESNext and babel transforms to node v6.10
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
};
export default config;
