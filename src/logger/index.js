const bunyan = require('bunyan');
const bunyanDebugStream = require('bunyan-debug-stream');

const logger = (config) => {
  const streams = [];
  const ringbuffer = new bunyan.RingBuffer({ limit: config.LOG_RING_BUFFER_LIMIT });

  const bunyanConfig = bunyan.createLogger({
    name: config.APP_NAME,
    streams: [
      {
        level: "trace",
        type: "raw",
        stream:
        bunyanDebugStream({
          basepath: __dirname, // this should be the root folder of your project.
          forceColor: true,
          showDate: (time) => {
            return time.toISOString();
          },
          options:{
            showPid:true
          }
        }),
      },
      {
        level: 'info',
        stream: process.stdout,
      },
      {
        level: 'debug',
        type: 'raw', // use 'raw' to get raw log record objects
        stream: ringbuffer,
      },
    ],
    serializers: bunyanDebugStream.stdSerializers,
  });
  return bunyanConfig;
};

module.exports = logger;
// log.trace('hi');
// console.log(ringbuffer.records);
