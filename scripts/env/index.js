'use strict';

const fs = require('fs');

let dotenvConfig = { parsed: {} };

module.exports.init = function (scriptEnv) {
  // Set env that is needed for build.
  setBuildEnvironment(scriptEnv);
};

function setBuildEnvironment(scriptEnv) {
  // Get environment variables from dotenv file if it exists.
  const dotenvFiles = [`.env.${process.env.NODE_ENV}`, `.env`];
  for (const dotenv of dotenvFiles) {
    if (fs.existsSync(dotenv)) {
      dotenvConfig = require('dotenv').config({ path: dotenv });
      break;
    }
  }

  /**
   * Re-write only major environment variables if there's no variable injected from cli.
   * (Priority)
   * 1) From cli (e.g. NODE_ENV=development node scripts/start.js)
   * 2) From dotenv file
   * 3) Argument injected from start.js, build.js)
   */
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = dotenvConfig.parsed.NODE_ENV || scriptEnv || 'development';
  }
  if (!process.env.BABEL_ENV) {
    process.env.BABEL_ENV = dotenvConfig.parsed.BABEL_ENV || scriptEnv || 'development';
  }
  if (!process.env.PUBLIC_URL) {
    process.env.PUBLIC_URL = dotenvConfig.parsed.PUBLIC_URL || '';
  }
}

module.exports.createClientEnv = function () {
  let clientEnv;

  // Set client environment variables with dotenv file if it exists.
  clientEnv = dotenvConfig.parsed;

  // Overwrite only major environment variables.
  Object.assign(clientEnv, {
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_URL: process.env.PUBLIC_URL,
  });

  return clientEnv;
};
