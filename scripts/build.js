const startTime = new Date(); // 시작
/**
 * ==================================================
 *                     Requires
 * ==================================================
 */
require('./env').init('production');

const webpack = require('webpack');

const createWebpackConfig = require('./configs/webpack.config');

/**
 * ==================================================
 *                     Build script
 * ==================================================
 */

let compiler;
let webpackConfig;
const logger = console;
try {
  logger.log(`Configuring...(1/2)`);
  webpackConfig = createWebpackConfig(process.env.NODE_ENV);
  compiler = webpack(webpackConfig);
} catch (error) {
  logger.log(`(❗️) Failed to configure. (❗️)`);
  logger.error(error.message ? error.message : error);
  process.exit(1);
}
logger.log(`Configured successfully! ✅`);

logger.log(`\nCompiling...(2/2)`);
compiler.run((error, stats) => {
  const endTime = new Date(); // 종료
  const statsError = stats && typeof stats.hasErrors === 'function' && stats.hasErrors();
  const statsWarning = stats && typeof stats.hasWarnings === 'function' && stats.hasWarnings();

  if (error || statsError || statsWarning) {
    logger.log('(❗️) Failed to compile. (❗️)\n');

    if (error) {
      logger.error(error.stack || error);
      if (error.details) {
        logger.error(error.details);
      }
    }

    const info = stats.toJson({ all: false, warnings: true, errors: true });

    if (statsError) {
      info.errors.forEach((error) => {
        logger.error(error.message);
      });
    }

    if (statsWarning) {
      info.warnings.forEach((warning) => {
        logger.warn(warning.message);
      });
    }
  } else {
    logger.log(`Compiled successfully! ✅`);
    logger.log(`in ${(endTime - startTime) / 1000} secs.`);
  }
});
