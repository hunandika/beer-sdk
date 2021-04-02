require('module-alias/register')

const configSdk = require('@config')
const config = configSdk()
const logger = require('@logger')


const log = logger(config)
// log.error('hello')
// log.trace({foo:'hunandika',bar:'asd'},'test warn')
// log.debug({foo:'hunandika',bar:'asd'},'test warn')
// log.info({foo:'hunandika',bar:'asd'},'test warn')
// log.warn({foo:'hunandika',bar:'asd'},'test warn')
log.error({foo:'hunandika',bar:'asd'},'test warn')
log.fatal({foo:'hunandika',bar:'asd'},'test warn')
