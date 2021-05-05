const defaultApp = require('./app');
const defaultLog = require('./log');
const defaultCache = require('./cache');

const defaultConfig = {
  development: {
    ...defaultApp.full,
    ...defaultLog.full,
    ...defaultLog.development,

    ...defaultCache.full,
    ...defaultCache.development,
  },
  production: {
    ...defaultApp.full,
    ...defaultLog.full,
    ...defaultLog.production,

    ...defaultCache.full,
    ...defaultCache.production,
  },
  test: {
    ...defaultApp.full,
    ...defaultLog.full,
    ...defaultCache.full,
  },
};

const convertEnvBoolean = val => {
  switch (val) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return val;
  }
};

const configSdk = (environment = 'development') => {
  const SDK_APP = /^SDK_/i;
  const envConfig = Object.keys(process.env)
    .filter(key => SDK_APP.test(key))
    .reduce((env, key) => ({ ...env, [key.replace(SDK_APP, '')]: convertEnvBoolean(process.env[key]) }), {});
  return {
    ...defaultConfig[environment],
    ...envConfig,
  };
};
module.exports = configSdk;
