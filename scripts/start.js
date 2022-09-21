/**
 * ==================================================
 *                     Requires
 * ==================================================
 */
require('./env')('development');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const createWebpackConfig = require('./configs/webpack.config');
const createWebpackDevServerConfig = require('./configs/webpackDevServer.config');
const { log } = require('./utils');

/**
 * ==================================================
 *                     Start script
 * ==================================================
 */
const webpackConfig = createWebpackConfig(process.env.NODE_ENV);
const webpackDevServerConfig = createWebpackDevServerConfig();

log.info(`Configuring...(1/2)`);
const compiler = webpack(webpackConfig);
const server = new webpackDevServer(webpackDevServerConfig, compiler);
log.info(`Configured successfully! ✅`);

log.info(`\nStarting the server...(2/2)`);
server.startCallback((error) => {
  if (error) {
    log.info(`(❗️) Failed to start the development server. (❗️)`);
    log.error(error);
    return;
  }

  const { host, port } = webpackDevServerConfig;

  log.info('The server is started successfully! ✅');
  log.info(`\n✨ The server is listening on http://${host}:${port} ✨\n`);
});
