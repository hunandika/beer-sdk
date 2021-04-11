const defaultApp = require('./app');
const defaultLog = require('./log');
const defaultCache = require('./cache');

const defaultConfig = {
  development: {
    ...defaultApp.full,
    ...defaultLog.full,
    ...defaultLog.development,

    ...defaultCache.full,
    ...defaultCache.development
  },
  production: {
    ...defaultApp.full,
    ...defaultLog.full,
    ...defaultLog.production,

    ...defaultCache.full,
    ...defaultCache.production
  },
  test: {
    ...defaultApp.full,
    ...defaultLog.full,
    ...defaultCache.full,
    ...defaultCache.full,
  },
};

const configSdk = (environment = 'development', envConfig = {}) => {
  return {
    ...defaultConfig[environment],
    ...envConfig,
  };
};
module.exports = configSdk;
