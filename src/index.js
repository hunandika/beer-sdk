require('module-alias/register');

require('dotenv').config();
const configSdk = require('@config');

const config = configSdk(process.env.NODE_ENV);
const logger = require('@logger');
const cacheManager = require('@cache');
const { toJSON, paginate } = require('@mongPlug');

const log = logger(config);
const cache = cacheManager(config, log);
const globalSdk = {
  log,
  cache,
  mongPlug: {
    toJSON,
    paginate,
  },
};
global.sdkLog = globalSdk.log;
global.sdkCache = globalSdk.cache;
global.sdkMongplug = { ...globalSdk.mongPlug };
module.exports = globalSdk;
