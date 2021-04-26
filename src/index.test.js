require('module-alias/register');
const sdk = require('./index');

describe('Index root Testing', () => {
  beforeEach(() => {});
  it('test root SDK', async () => {
    expect(sdk).toHaveProperty('log');
    expect(sdk).toHaveProperty('cache');
    expect(global.sdk).toHaveProperty('log');
    expect(global.sdk).toHaveProperty('cache');
    expect(sdk.log).toBeTruthy();
    expect(sdk.cache).toBeTruthy();
    expect(global.sdk).toBeTruthy();
  });
});
