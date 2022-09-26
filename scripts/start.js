/**
 * ==================================================
 *                     Requires
 * ==================================================
 */
require('./env').init('development');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const createWebpackConfig = require('./configs/webpack.config');
const createWebpackDevServerConfig = require('./configs/webpackDevServer.config');

/**
 * ==================================================
 *                     Start script
 * ==================================================
 */

let webpackConfig;
let webpackDevServerConfig;
let compiler;
let server;
const logger = console;
try {
  logger.log(`Configuring...(1/2)`);
  webpackConfig = createWebpackConfig(process.env.NODE_ENV);
  webpackDevServerConfig = createWebpackDevServerConfig();
  compiler = webpack(webpackConfig);
  server = new webpackDevServer(webpackDevServerConfig, compiler);
} catch (error) {
  logger.log(`(❗️) Failed to configure. (❗️)`);
  logger.error(error.message ? error.message : error);
  process.exit(1);
}
logger.log(`Configured successfully! ✅`);

logger.log(`\nStarting the server...(2/2)`);
server.startCallback((error) => {
  if (error) {
    logger.log(`(❗️) Failed to start the development server. (❗️)`);
    logger.error(error);
    return;
  }

  const { host, port } = webpackDevServerConfig;

  logger.log('The server is started successfully! ✅');
  logger.log(
    `\n✨ The server is listening on http://${host}:${port}${
      process.env.PUBLIC_URL && process.env.PUBLIC_URL
    } ✨\n`,
  );
});
