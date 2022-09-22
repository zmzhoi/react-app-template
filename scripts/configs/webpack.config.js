const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { fixPublicUrl } = require('../utils');
const paths = require('./paths');

const moduleID = Symbol();

module.exports = function (env) {
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  const isProduction = env === 'production';

  const webpackConfig = {
    mode: env,
    entry: {
      app: paths.entry, // name: 'app'
    },
    output: {
      path: paths.output,
      publicPath: fixPublicUrl(process.env.PUBLIC_URL),
      filename: 'js/bundle.js', // = output.path + output.filename
    },
    resolve: {
      extensions,
    },
    devtool: false,
    module: {
      rules: [
        // Apply babel-loader
        {
          [moduleID]: 'BabelHandling',
          test: /\.(js|jsx|ts|tsx)$/,
          include: paths.src,
          loader: 'babel-loader',
        },
        {
          // Apply style-loader + css-loader
          [moduleID]: 'CssHandling',
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
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

  if (isProduction) {
    // Set Optimization.
    webpackConfig.optimization = {
      minimize: true,
      minimizer: [],
    };

    // Change name of bundle file.
    webpackConfig.output.filename = 'js/[name].[contenthash:8].js';

    // Change handling css.
    const cssRule = webpackConfig.module.rules.find((rule) => rule[moduleID] === 'CssHandling');
    cssRule.use = [MiniCssExtractPlugin.loader, 'css-loader'];
    webpackConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
      }),
    );
    webpackConfig.optimization.minimizer.push(new CssMinimizerPlugin());

    // others..
  }

  return webpackConfig;
};
