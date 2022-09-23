const path = require('path');

const rootPath = process.cwd();

function resolvePath(pathToResolve) {
  return path.resolve(rootPath, pathToResolve);
}
// 절대 경로 반환
module.exports = {
  root: rootPath,
  nodeModules: resolvePath('node_modules'),
  src: resolvePath('src'),
  entry: resolvePath('src/index.js'),
  output: resolvePath('build'),
  htmlTemplate: resolvePath('public/index.html'),
  webpackConfigFile: resolvePath('webpack.config.js'),
};