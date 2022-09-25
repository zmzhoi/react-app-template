const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PostCssPresetEnv = require('postcss-preset-env');

const { fixPublicUrl } = require('../utils');
const paths = require('./paths');

const moduleID = Symbol();

module.exports = function (env) {
  const isProduction = env === 'production';
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  const assetInlineSizeLimit = 10 * 1024; // 10KB

  const webpackConfig = {
    mode: env,
    entry: {
      app: paths.entry, // name: 'app'
    },
    output: {
      path: paths.output,
      publicPath: fixPublicUrl(process.env.PUBLIC_URL),
      filename: 'js/bundle.js', // = output.path + output.filename
      assetModuleFilename: 'asset/[name][ext]',
    },
    resolve: {
      extensions,
    },
    devtool: false,
    module: {
      rules: [
        {
          oneOf: [
            // Asset Module
            {
              [moduleID]: 'ASSET_RULE',
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: assetInlineSizeLimit,
                },
              },
            },
            // SVG
            {
              [moduleID]: 'SVG_RULE',
              test: /\.svg$/,
              use: ['@svgr/webpack'],
            },
            // Babel-Loader
            {
              [moduleID]: 'BABEL_RULE',
              test: /\.(js|jsx|ts|tsx)$/,
              include: paths.src,
              loader: 'babel-loader',
            },
            {
              // Style-Loader + Css-Loader + PostCss-Loader
              [moduleID]: 'CSS_RULE',
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [PostCssPresetEnv()],
                    },
                  },
                },
              ],
            },
          ],
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
    const webpackModuleRules = webpackConfig.module.rules[0].oneOf;

    /** Set Optimization. **/
    webpackConfig.optimization = {
      minimize: true,
      minimizer: [],
    };

    /** Change name of bundle file. **/
    webpackConfig.output.filename = 'js/[name].[contenthash:8].js';

    /** Change name of asset files. **/
    webpackConfig.output.assetModuleFilename = 'asset/[hash][ext][query]';

    /** Change handling css. **/
    /* (+) MiniCssExtractPlugin
     * Output path: /build/css/[name].[contenthash:8].css
     */
    const cssRule = webpackModuleRules.find((rule) => rule[moduleID] === 'CSS_RULE');
    cssRule.use = [
      MiniCssExtractPlugin.loader, // To use MiniCssExtractPlugin, style-loader is removed.
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [PostCssPresetEnv()],
          },
        },
      },
    ];
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
