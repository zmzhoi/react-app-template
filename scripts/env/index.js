'use strict';

const fs = require('fs');

let dotenvConfig;

function setRutimeEnvironment(scriptEnv) {
  // Set env from dotenv file.
  let dotenvFile;
  const dotenvFileRexList = [`.env.${process.env.NODE_ENV}`, `.env`];

  dotenvFileRexList.some((_dotenvFile) => {
    if (fs.existsSync(_dotenvFile)) {
      dotenvFile = _dotenvFile;
      return true;
    }
    return false;
  });

  if (dotenvFile) {
    dotenvConfig = require('dotenv').config({ path: dotenvFile });
  }

  /**
   * Set environment variables
   * (Environment variables priority)
   * 1) from cli
   * 2) from dotenv file
   * 3) argument of this function (injected from start.js, build.js)
   */
  process.env.NODE_ENV =
    process.env.NODE_ENV || dotenvConfig.parsed.NODE_ENV || scriptEnv || 'development';
  process.env.BABEL_ENV =
    process.env.BABEL_ENV || dotenvConfig.parsed.BABEL_ENV || scriptEnv || 'development';
  process.env.PUBLIC_URL = process.env.PUBLIC_URL || dotenvConfig.parsed.PUBLIC_URL || '/';
}

module.exports.init = function (scriptEnv) {
  // set runtime env.
  setRutimeEnvironment(scriptEnv);
};

module.exports.createClientEnv = function () {
  const defaultClientEnv = {
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_URL: process.env.PUBLIC_URL,
  };

  let clientEnv;
  if (dotenvConfig && dotenvConfig.parsed) {
    clientEnv = {
      ...dotenvConfig.parsed,
      ...defaultClientEnv,
    };
  }
  return clientEnv;
};
