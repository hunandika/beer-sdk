require('module-alias/register');
const configSdk = require('@config');
const logger = require('@logger');
const cacheManager = require('./cacheManager');

let cache;
const userId = 123;
const key = `user_${userId}`;
const userData = { id: userId, name: 'Bob' };

describe('Cache Manager Testing', () => {
  afterAll(done => {
    done();
  });
  beforeEach(() => {
    const config = configSdk(process.env.NODE_ENV);
    log = logger(config);
    cache = cacheManager(config, log);
  });

  it('Test Cache Running Properly', async done => {
    await cache.set(key, { id: userId, name: 'Bob' });
    const data = await cache.get(key);
    expect(data).toEqual(userData);
    expect(cache.stores[0].store.name).toEqual('memory');
    expect(cache.stores[1].store.name).toEqual('redis');
    done();
  });
});
