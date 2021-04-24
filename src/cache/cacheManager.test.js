require('module-alias/register');
const configSdk = require('@config');
const logger = require('@logger');
const cacheManager = require('./cacheManager');

// const mockCache = (mockConfig = {}) => {
//   const config = configSdk(process.env.NODE_ENV, mockConfig);
//   const log = logger(config);
//   return cacheManager(config, log);
// };

let cache;
const userId = 123;
const key = 'user_' + userId;
const userData = { id: userId, name: 'Bob' };

describe('Cache Manager Testing', () => {
  beforeEach(() => {
    const config = configSdk(process.env.NODE_ENV);
    log = logger(config);
    cache = cacheManager(config, log);
  });

  it('test CACHE_MEMORY_ENABLE', async () => {
    await cache.set(key, { id: userId, name: 'Bob' });
    const data = await cache.get(key);
    expect(data).toEqual(userData);
    expect(cache.stores[0].store.name).toEqual('memory');
  });

  it('test CACHE_REDIS_ENABLE', async () => {
    await cache.set(key, { id: userId, name: 'Bob' });
    const data = await cache.get(key);
    expect(data).toEqual(userData);
    expect(cache.stores[1].store.name).toEqual('redis');
  });

  it('test CACHE_MONGO_ENABLE', async () => {
    await cache.set(key, { id: userId, name: 'Bob' });
    const data = await cache.get(key);
    expect(data).toEqual(userData);
    expect(cache.stores[2].store.name).toEqual('mongodb');
  });
});
