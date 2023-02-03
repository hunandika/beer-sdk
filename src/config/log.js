const dayjs = require('dayjs');

module.exports = {
  full: {
    LOG_RING_BUFFER_LIMIT: 100,
    LOG_STDOUT_LEVEL: 'trace',
    LOG_DEBUG_STREAM_LEVEL: 'trace',
    LOG_RING_BUFFER_LEVEL: 'info',
    LOG_SLACK_LEVEL: 'trace',
    LOG_ROTATING_STREAM_LEVEL: 'trace',
    LOG_ROTATING_FILE_PATH: `${process.cwd()}/src/logger/${dayjs().format('DD-MM-YYYY')}.log`,
    LOG_ROTATING_FILE_PERIOD: '1d',
    LOG_ROTATING_FILE_COUNT: 3,
  },
  development: {
    LOG_STDOUT_ENABLE: false,
    LOG_DEBUG_STREAM_ENABLE: true,
    LOG_ROTATING_FILE_ENABLE: false,
    LOG_SLACK_ENABLE: false,
    LOG_SLACK_WEBHOOK_URL: '',
  },
  production: {
    LOG_STDOUT_ENABLE: false,
    LOG_DEBUG_STREAM_ENABLE: true,
    LOG_ROTATING_FILE_ENABLE: false,
    LOG_SLACK_ENABLE: false,
    LOG_SLACK_WEBHOOK_URL: '',
  },
};
