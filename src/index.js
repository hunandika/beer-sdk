require('module-alias/register')

const configSdk = require('@config')
const config = configSdk()
const logger = require('@logger')


const log = logger(config)
log.error('hello')