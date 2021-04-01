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
};

const configSdk = (environment = 'production') => {
  return {
    ...defaultConfig[environment],
  };
};
module.exports = configSdk;
