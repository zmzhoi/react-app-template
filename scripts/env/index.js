const PROD = 'production';
const DEV = 'development';

module.exports = function (env) {
  const realEnv = process.env.NODE_ENV || env;

  if (realEnv === PROD) {
    process.env.NODE_ENV = PROD;
    process.env.BABEL_ENV = PROD;
  } else {
    process.env.NODE_ENV = DEV;
    process.env.BABEL_ENV = DEV;
  }
};
