require('module-alias/register')

const configSdk = require('@config')
const config = configSdk()
const logger = require('@logger')
const cacheManager = require('@cache')


const log = logger(config)
const cache = cacheManager(config,log)
// log.error('hello')
// log.trace({foo:'hunandika',bar:'asd'},'test warn')
// log.debug({foo:'hunandika',bar:'asd'},'test warn')
// log.info({foo:'hunandika',bar:'asd'},'test warn')
// log.warn({foo:'hunandika',bar:'asd'},'test warn')
// log.error({foo:'hunandika',bar:'asd'},'test warn')
// log.fatal({foo:'hunandika',bar:'asd'},'test warn')


function getUser(id, cb) {
  setTimeout(function () {
    console.log('Returning user from slow database.');
    cb(null, { id: id, name: 'Bob' });
  }, 100);
}

var userId = 123;
var key = 'user_' + userId;

// Note: ttl is optional in wrap()
cache.wrap(
  key,
  function (cb) {
    getUser(userId, cb);
  },
  {ttl:5},
  function (err, user) {
    console.log(user);
  },
);

// Second time fetches user from memoryCache
setTimeout(function () {
  cache.wrap(
    key,
    function (cb) {
      getUser(userId, cb);
    },
    function (err, user) {
      console.log(user);
    },
  );
}, 2000);