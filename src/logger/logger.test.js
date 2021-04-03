require('module-alias/register');
const configSdk = require('@config');
const logger = require('./logger');
const del = require('del');

const mockLog = (mockConfig = {}) => {
  const config = configSdk(process.env.NODE_ENV, mockConfig);
  return logger(config);
};

describe('Logger Testing', () => {
  afterAll(async () => await del(['src/logger/*.log']));
  it('test LOG_STDOUT_ENABLE', () => {
    const mockConfig = {
      LOG_STDOUT_ENABLE: true,
    };
    const log = mockLog(mockConfig);
    expect(log.streams).toHaveLength(2);
    expect(log.trace()).toBeTruthy();
    expect(log.debug()).toBeTruthy();
    expect(log.info()).toBeTruthy();
    expect(log.warn()).toBeTruthy();
    expect(log.error()).toBeTruthy();
    expect(log.fatal()).toBeTruthy();
  });

  it('test LOG_DEBUG_STREAM_ENABLE', () => {
    const mockConfig = {
      LOG_DEBUG_STREAM_ENABLE: true,
    };
    const log = mockLog(mockConfig);
    expect(log.streams[0].stream.options).toMatchObject({
      showDate: expect.any(Function)
    });
    expect(log.streams).toHaveLength(2);
    expect(log.trace()).toBeTruthy();
    expect(log.debug()).toBeTruthy();
    expect(log.info()).toBeTruthy();
    expect(log.warn()).toBeTruthy();
    expect(log.error()).toBeTruthy();
    expect(log.fatal()).toBeTruthy();
  });

  it('test LOG_ROTATING_FILE_ENABLE', () => {
    const mockConfig = {
      LOG_ROTATING_FILE_ENABLE: true,
    };
    const log = mockLog(mockConfig);
    expect(log.streams).toHaveLength(2);
    expect(log.trace()).toBeTruthy();
    expect(log.debug()).toBeTruthy();
    expect(log.info()).toBeTruthy();
    expect(log.warn()).toBeTruthy();
    expect(log.error()).toBeTruthy();
    expect(log.fatal()).toBeTruthy();
  });

  it('test LOG_SLACK_ENABLE', () => {
    const mockConfig = {
      LOG_SLACK_ENABLE: true,
      LOG_SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/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',
    };
    const log = mockLog(mockConfig);
    expect(log.streams).toHaveLength(2);
    expect(log.trace()).toBeTruthy();
    expect(log.debug()).toBeTruthy();
    expect(log.info()).toBeTruthy();
    expect(log.warn()).toBeTruthy();
    expect(log.error()).toBeTruthy();
    expect(log.fatal()).toBeTruthy();
  });
});
