const bunyan = require('bunyan');
const bunyanDebugStream = require('bunyan-debug-stream');
const BunyanSlack = require('bunyan-slack');
const RotatingFileStream = require('bunyan-rotating-file-stream');

const logger = config => {
  const streams = [];

  // bunyan stdout
  if (config.LOG_STDOUT_ENABLE) {
    streams.push({
      level: config.LOG_STDOUT_LEVEL,
      stream: process.stdout,
    });
  }

  // bunyan debug stream
  if (config.LOG_DEBUG_STREAM_ENABLE) {
    streams.push({
      level: config.LOG_DEBUG_STREAM_LEVEL,
      type: 'raw',
      stream: bunyanDebugStream({
        basepath: __dirname, // this should be the root folder of your project.
        forceColor: true,
        showDate: time =>
          /* istanbul ignore next */
          time.toISOString(),
      }),
    });
  }

  // bunyan file rotating
  if (config.LOG_ROTATING_FILE_ENABLE) {
    streams.push({
      level: config.LOG_ROTATING_STREAM_LEVEL,
      stream: new RotatingFileStream({
        path: config.LOG_ROTATING_FILE_PATH,
        period: config.LOG_ROTATING_FILE_PERIOD, // daily rotation
        totalFiles: 1, // parseInt(config.LOG_ROTATING_FILE_COUNT, 10) || 1, // keep 3 back copies
        rotateExisting: true,
      }),
    });
  }

  // bunyan slack notif
  if (config.LOG_SLACK_ENABLE) {
    /* istanbul ignore next */
    const color = levelName => {
      switch (levelName) {
        case 'trace':
          return '#80D2DE';
        case 'debug':
          return '#49C39E';
        case 'info':
          return '#49C39E';
        case 'warn':
          return '#EBB424';
        case 'error':
          return '#D40E0D';
        case 'fatal':
          return '#3F0F3F';
        default:
          return '#80D2DE';
      }
    };
    /* istanbul ignore next */
    streams.push({
      level: config.LOG_SLACK_LEVEL,
      stream: new BunyanSlack({
        webhook_url: config.LOG_SLACK_WEBHOOK_URL,
        customFormatter(record, levelName) {
          return {
            attachments: [
              {
                color: color(levelName),
                author_name: config.APP_NAME,
                title: record.msg,
                fields: [
                  {
                    title: `We have a new ${levelName} log`,
                    value: JSON.stringify(record),
                  },
                ],
              },
            ],
          };
        },
      }),
    });
  }

  const ringBuffer = new bunyan.RingBuffer({ limit: parseInt(config.LOG_RING_BUFFER_LIMIT, 10) || 100 });
  streams.push({
    level: config.LOG_RING_BUFFER_LEVEL,
    type: 'raw', // use 'raw' to get raw log record objects
    stream: ringBuffer,
  });

  const bunyanConfig = bunyan.createLogger({
    name: config.APP_NAME,
    streams,
    serializers: bunyanDebugStream.stdSerializers,
  });
  bunyanConfig.ringBuffer = ringBuffer;
  return bunyanConfig;
};

module.exports = logger;
