'use strict';

const fs = require('fs');

let dotenvConfig;

function setBuildEnvironment(scriptEnv) {
  // Overwrite environment variables with dotenv file and get it.
  let dotenvFile;
  const dotenvFiles = [`.env.${process.env.NODE_ENV}`, `.env`];

  dotenvFiles.some((file) => {
    if (fs.existsSync(file)) {
      dotenvFile = file;
      return true;
    }
    return false;
  });

  if (dotenvFile) {
    dotenvConfig = require('dotenv').config({ path: dotenvFile });
  }

  /**
   * Re-overwrite only major environment variables.
   * [Priority]
   * 1) From cli (e.g. NODE_ENV=development node scripts/start.js)
   * 2) From dotenv file
   * 3) Argument of this function (injected from start.js, build.js)
   */
  process.env.NODE_ENV =
    process.env.NODE_ENV || dotenvConfig.parsed.NODE_ENV || scriptEnv || 'development';
  process.env.BABEL_ENV =
    process.env.BABEL_ENV || dotenvConfig.parsed.BABEL_ENV || scriptEnv || 'development';
  process.env.PUBLIC_URL = process.env.PUBLIC_URL || dotenvConfig.parsed.PUBLIC_URL || '';
}

module.exports.init = function (scriptEnv) {
  // Set env that is needed for build.
  setBuildEnvironment(scriptEnv);
};

module.exports.createClientEnv = function () {
  let clientEnv;

  // Set client environment variables with dotenv file if it exists.
  if (dotenvConfig && dotenvConfig.parsed) {
    clientEnv = dotenvConfig.parsed;
  }

  // Overwrite only major environment variables.
  Object.assign(clientEnv, {
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_URL: process.env.PUBLIC_URL,
  });

  return clientEnv;
};
