module.exports = {
  full: {
    CACHE_MEMORY_ENABLE: false,
    CACHE_MEMORY_MAX: 1000,
    CACHE_MEMORY_TTL: 60,

    CACHE_REDIS_ENABLE: false,
    CACHE_REDIS_HOST: '127.0.0.1',
    CACHE_REDIS_PORT: 6379,
    CACHE_REDIS_AUTHPASS: '',
    CACHE_REDIS_DB: 0,
    CACHE_REDIS_TTL: 60,

    CACHE_MONGO_ENABLE: false,
    CACHE_MONGO_URI: '',
    CACHE_MONGO_COLLECTION: 'cacheManager',
    CACHE_MONGO_POOL_SIZE: 5,
    CACHE_MONGO_COMPRESSION: false,
    CACHE_MONGO_TTL: 60,
  },
  development: {
    CACHE_MEMORY_ENABLE: true,
    CACHE_REDIS_ENABLE: false,
    CACHE_MONGO_ENABLE: false,
  },
  production: {
    CACHE_MEMORY_ENABLE: false,
    CACHE_REDIS_ENABLE: false,
    CACHE_MONGO_ENABLE: false,
  },
};
