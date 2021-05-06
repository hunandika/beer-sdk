require('module-alias/register');
const configSdk = require('@config');
const logger = require('./logger');
const del = require('del');

let log;

describe('Logger Testing', () => {
  beforeEach(() => {
    const config = configSdk(process.env.NODE_ENV);
    log = logger(config);
  });

  afterAll(async () => await del(['src/logger/*.log']));

  it('test Logger Running Properly', () => {
    expect(log.trace()).toBeTruthy();
    expect(log.debug()).toBeTruthy();
    expect(log.info()).toBeTruthy();
    expect(log.warn()).toBeTruthy();
    expect(log.error()).toBeTruthy();
    expect(log.fatal()).toBeTruthy();
    expect(log.streams[1].stream.options).toMatchObject({
      showDate: expect.any(Function),
    });
  });
});
