const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis-store');
const mongoStore = require('cache-manager-mongodb');

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

  if (config.CACHE_MONGO_ENABLE) {
    stores.push(
      cacheManager.caching({
        store: mongoStore,
        uri: config.CACHE_MONGO_URI,
        options: {
          collection: config.CACHE_MONGO_COLLECTION,
          compression: config.CACHE_MONGO_COMPRESSION,
          poolSize: config.CACHE_MONGO_POOL_SIZE,
          ttl: config.CACHE_MONGO_TTL
        },
      }),
    );
  }

  let globalCache = cacheManager.multiCaching(stores);
  globalCache.stores = stores;
  log.info('cache connected!', {
    appName: config.APP_NAME,
    CACHE_MEMORY_ENABLE: config.CACHE_MEMORY_ENABLE,
    CACHE_REDIS_ENABLE: config.CACHE_REDIS_ENABLE,
    CACHE_MONGO_ENABLE: config.CACHE_MONGO_ENABLE,
  });
  return globalCache;
};
module.exports = cache;
