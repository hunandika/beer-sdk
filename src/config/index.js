const defaultApp = require('./app');
const defaultLog = require('./log');

const defaultConfig = {
  development: {
    ...defaultApp.full,
    ...defaultLog.full,
    ...defaultLog.development,
  },
  production: {
    ...defaultApp.full,
    ...defaultLog.full,
    ...defaultLog.production,
  },
  test: {
    ...defaultApp.full,
    ...defaultLog.full,
  },
};

const configSdk = (environment = 'production',envConfig={}) => {
  return {
    ...defaultConfig[environment],
    ...envConfig,
  };
};
module.exports = configSdk;
