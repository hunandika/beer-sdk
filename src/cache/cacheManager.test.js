require('module-alias/register');
const configSdk = require('@config');
const logger = require('@logger');
const cacheManager = require('./cacheManager');

const mockCache = (mockConfig = {}) => {
  const config = configSdk(process.env.NODE_ENV, mockConfig);
  const log = logger(config);
  return cacheManager(config, log);
};

const userId = 123;
const key = 'user_' + userId;
const userData = { id: userId, name: 'Bob' };

describe('Cache Manager Testing', () => {
  it('test CACHE_MEMORY_ENABLE', async () => {
    const mockConfig = {
      CACHE_MEMORY_ENABLE: true,
      LOG_DEBUG_STREAM_ENABLE: true,
    };
    const cache = mockCache(mockConfig);
    await cache.set(key, { id: userId, name: 'Bob' });
    const data = await cache.get(key);
    expect(data).toEqual(userData);
    expect(cache.stores[0].store.name).toEqual('memory');
  });

  it('test CACHE_REDIS_ENABLE', async () => {
    const { CACHE_REDIS_HOST, CACHE_REDIS_PORT, CACHE_REDIS_AUTHPASS, CACHE_REDIS_DB, CACHE_REDIS_TTL } = process.env;
    const mockConfig = {
      CACHE_REDIS_ENABLE: true,
      LOG_DEBUG_STREAM_ENABLE: true,
      CACHE_REDIS_HOST,
      CACHE_REDIS_PORT,
      CACHE_REDIS_AUTHPASS,
      CACHE_REDIS_DB,
      CACHE_REDIS_TTL,
    };
    const cache = mockCache(mockConfig);
    await cache.set(key, { id: userId, name: 'Bob' });
    const data = await cache.get(key);
    expect(data).toEqual(userData);
    expect(cache.stores[0].store.name).toEqual('redis');
  });

  it('test CACHE_MONGO_ENABLE', async () => {
    const {
      CACHE_MONGO_URI,
      CACHE_MONGO_COLLECTION,
      CACHE_MONGO_POOL_SIZE,
      CACHE_MONGO_TTL,
    } = process.env;
    const mockConfig = {
      CACHE_MONGO_ENABLE: true,
      LOG_DEBUG_STREAM_ENABLE: true,
      CACHE_MONGO_URI,
      CACHE_MONGO_COLLECTION,
      CACHE_MONGO_POOL_SIZE,
      CACHE_MONGO_TTL,
    };
    const cache = mockCache(mockConfig);
    await cache.set(key, { id: userId, name: 'Bob' });
    const data = await cache.get(key);
    expect(data).toEqual(userData);
    expect(cache.stores[0].store.name).toEqual('mongodb');
  });
});
