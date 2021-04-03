module.exports = {
    full:{
        LOG_RING_BUFFER_LIMIT: 100,
        LOG_STDOUT_LEVEL: 'trace',
        LOG_DEBUG_STREAM_LEVEL: 'trace',
        LOG_RING_BUFFER_LEVEL: 'info',
        LOG_SLACK_LEVEL: 'trace',
        LOG_ROTATING_STREAM_LEVEL: 'trace',
        LOG_ROTATING_FILE_PATH: `${process.cwd()}/src/logger/${new Date().toISOString()}.log`,
        LOG_ROTATING_FILE_PERIOD: '1d',
        LOG_ROTATING_FILE_COUNT: 3
    },
    development: {
        LOG_STDOUT_ENABLE: false,
        LOG_DEBUG_STREAM_ENABLE: true,
        LOG_ROTATING_FILE_ENABLE: false,
        LOG_SLACK_ENABLE: false,
        LOG_SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/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',
    },
    production:{
        LOG_STDOUT_ENABLE: false,
        LOG_DEBUG_STREAM_ENABLE: true,
        LOG_ROTATING_FILE_ENABLE: false,
        LOG_SLACK_ENABLE: false,
        LOG_SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/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',
    }
}