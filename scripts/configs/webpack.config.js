const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { fixPublicUrl } = require('../utils');
const paths = require('./paths');

module.exports = function (env) {
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  const isProduction = env === 'production';

  return {
    mode: env,
    entry: {
      app: paths.entry, // name: 'app'
    },
    output: {
      path: paths.output,
      publicPath: fixPublicUrl(process.env.PUBLIC_URL),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/bundle.js', // = output.path + output.filename
    },
    resolve: {
      extensions,
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: paths.src,
          loader: require.resolve('babel-loader'),
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      // minimizer ...
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.htmlTemplate,
      }),
      new ESLintPlugin({
        extensions,
        failOnWarning: true,
        cache: true,
        cacheLocation: path.resolve(paths.nodeModules, '.cache/.eslintcache'),
      }),
    ],
  };
};
