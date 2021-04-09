const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis-store');

const cache = (config, log) => {
  let stores = [];

  if (config.CACHE_MEMORY_ENABLE) {
    stores.push(cacheManager.caching({ store: 'memory', max: config.CACHE_MEMORY_MAX, ttl: config.CACHE_MEMORY_TTL }));
  }

  if (config.CACHE_REDIS_ENABLE) {
    stores.push(
      cacheManager.caching({
        store: redisStore,
        host: config.CACHE_REDIS_HOST,
        port: config.CACHE_REDIS_PORT,
        auth_pass: config.CACHE_REDIS_AUTHPASS,
        db: config.CACHE_REDIS_DB,
        ttl: config.CACHE_REDIS_TTL,
      }),
    );
  }

  const globalCache = cacheManager.multiCaching(stores);
  log.info('cache connected!', {
    appName: config.APP_NAME,
    CACHE_MEMORY_ENABLE: config.CACHE_MEMORY_ENABLE,
    CACHE_REDIS_ENABLE: config.CACHE_REDIS_ENABLE,
  });
  return globalCache;
};
module.exports = cache;
