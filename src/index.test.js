require('module-alias/register');
const sdk = require('./index');

describe('Index root Testing', () => {
  beforeEach(() => {});
  it('test root SDK', async () => {
    expect(sdk).toHaveProperty('log');
    expect(sdk).toHaveProperty('cache');
    expect(sdk).toHaveProperty('mongPlug');
    expect(global).toHaveProperty('sdkLog');
    expect(global).toHaveProperty('sdkCache');
    expect(global).toHaveProperty('sdkMongplug');
    expect(global.sdkLog).toBeTruthy();
    expect(global.sdkCache).toBeTruthy();
    expect(global.sdkMongplug).toBeTruthy();
  });
});
