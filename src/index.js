require('module-alias/register');

require('dotenv').config();
const configSdk = require('@config');
const config = configSdk(process.env.NODE_ENV);
const logger = require('@logger');
const cacheManager = require('@cache');

const log = logger(config);
const cache = cacheManager(config, log);
const globalSdk = {
  log,
  cache
}
global.sdk = globalSdk;
module.exports = globalSdk