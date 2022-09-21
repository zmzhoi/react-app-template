/**
 * ==================================================
 *                     Requires
 * ==================================================
 */
require('./env')('production');

const webpack = require('webpack');

const createWebpackConfig = require('./configs/webpack.config');
const { log } = require('./utils');

/**
 * ==================================================
 *                     Build script
 * ==================================================
 */
const webpackConfig = createWebpackConfig(process.env.NODE_ENV);

let compiler;
try {
  log.info(`Configuring...(1/2)`);
  compiler = webpack(webpackConfig);
  log.info(`Configured successfully! ✅`);
} catch (error) {
  if (error) {
    log.info(`(❗️) Failed to configure. (❗️)`);
    log.error(error.message ? error.message : error);
  }
  process.exit(1);
}

log.info(`\nCompiling...(2/2)`);

compiler.run((error, stats) => {
  const statsError = stats && typeof stats.hasErrors === 'function' && stats.hasErrors();
  const statsWarning = stats && typeof stats.hasWarnings === 'function' && stats.hasWarnings();

  if (error || statsError || statsWarning) {
    log.info('(❗️) Failed to compile. (❗️)\n');

    if (error) {
      log.error(error.stack || error);
      if (error.details) {
        log.error(error.details);
      }
    }

    const info = stats.toJson({ all: false, warnings: true, errors: true });

    if (statsError) {
      info.errors.forEach((error) => {
        log.error(error.message);
      });
    }

    if (statsWarning) {
      info.warnings.forEach((warning) => {
        log.warn(warning.message);
      });
    }
  } else {
    log.info(`Compiled successfully! ✅`);
  }
});
