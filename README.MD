  

# Beer-Sdk

## Wrapper package Node.js app most used for backend services

  

This is just a collection list node js package most used. If you create node js from scratch you can avoid DRY (Don't Repeat Yourself) to configure like logger, cache, etc..

  

## Features


- Logging: using [bunyan](https://www.npmjs.com/package/bunyan)
	-  [bunyan-slack](https://www.npmjs.com/package/bunyan-slack)
	-  [bunyan-debug-stream](https://www.npmjs.com/package/bunyan-debug-stream)
- Cache: using [cache-manager](https://www.npmjs.com/package/cache-manager)
	-  [cache-manager-mongodb](https://www.npmjs.com/package/cache-manager-mongodb)
	-  [cache-manager-redis-store](https://www.npmjs.com/package/cache-manager-redis-store)
	- Cache memory

  

## Installation

  
npm install sdk@npm:beer-sdk --save

or

yarn add sdk@npm:beer-sdk
  

## Usage Examples

Please attach this code to root/parent js code.
See examples below on how to implement the Beer sdk.


### Index.js or App.js

    require('sdk');

#### *Note: this code just only called only once in root js project!!!

only once import this code you can use sdk feature on all file js without confused with much config. It's Magic!!! :laughing:

### Logger

    //log example
    sdk.log.trace('trace log')
    sdk.log.debug('debug log')
    sdk.log.info('info log')
    sdk.log.warn('warn log')
    sdk.log.error('error log')
    sdk.log.fatal('fatal log')

  

### Cache-Manager

    // cache example
    function getUser(id, cb) {
    	setTimeout(function () {
			sdk.log.info('Returning user from slow database.');
			cb(null, { id: id, name: 'Bob' });
    	}, 100);
    }
    
    var userId = 123;
    var key = 'user_' + userId;
    
    // Note: ttl is optional in wrap()
    sdk.cache.wrap(key, function (cb) {
    	getUser(userId, cb);
    }, { ttl: 5 }, function (err, user) {
    	sdk.log.info(user);
    })
    
    // Second time fetches user from memoryCache
    sdk.cache.wrap(key,function (cb) {
    	getUser(userId, cb);
    }, function (err, user) {
    	sdk.log.info(user);
    });

## Environment Variables

Default Config Log

    //full
    SDK_LOG_RING_BUFFER_LIMIT=100
    SDK_LOG_STDOUT_LEVEL=trace
    SDK_LOG_DEBUG_STREAM_LEVEL=trace
    SDK_LOG_RING_BUFFER_LEVEL=info
    SDK_LOG_SLACK_LEVEL=trace
    SDK_LOG_ROTATING_STREAM_LEVEL=trace
    SDK_LOG_ROTATING_FILE_PATH=`${process.cwd()}/src/logger/${new  Date().toISOString()}.log`
    SDK_LOG_ROTATING_FILE_PERIOD=1d
    SDK_LOG_ROTATING_FILE_COUNT=3
    
    //NODE_ENV = development
    SDK_LOG_STDOUT_ENABLE=false
    SDK_LOG_DEBUG_STREAM_ENABLE=true
    SDK_LOG_ROTATING_FILE_ENABLE=false
    SDK_LOG_SLACK_ENABLE=false
    SDK_LOG_SLACK_WEBHOOK_URL=
    
    //NODE_ENV = production
    SDK_LOG_STDOUT_ENABLE=false
    SDK_LOG_DEBUG_STREAM_ENABLE=true
    SDK_LOG_ROTATING_FILE_ENABLE=false
    SDK_LOG_SLACK_ENABLE=false
    SDK_LOG_SLACK_WEBHOOK_URL=
    
Default Config Cache

    // full
    SDK_CACHE_MEMORY_MAX=1000
    SDK_CACHE_MEMORY_TTL=60
    
    SDK_CACHE_REDIS_HOST=127.0.0.1
    SDK_CACHE_REDIS_PORT=6379
    SDK_CACHE_REDIS_AUTHPASS=
    SDK_CACHE_REDIS_DB=0
    SDK_CACHE_REDIS_TTL=60
    
    SDK_CACHE_MONGO_URI=
    SDK_CACHE_MONGO_COLLECTION=cacheManager
    SDK_CACHE_MONGO_POOL_SIZE=5
    SDK_CACHE_MONGO_COMPRESSION=false
    SDK_CACHE_MONGO_TTL=60
      
    //NODE_ENV = development
    SDK_CACHE_MEMORY_ENABLE=true
    SDK_CACHE_REDIS_ENABLE=false
    SDK_CACHE_MONGO_ENABLE=false
      
    //NODE_ENV = production
    SDK_CACHE_MEMORY_ENABLE=false
    SDK_CACHE_REDIS_ENABLE=false
    SDK_CACHE_MONGO_ENABLE=false

##### *Note: You can override this config with adding to .env your project using prefix SDK_
  

## Contribution
  

Want to help improve this package? We take [pull requests](https://github.com/hunandika/beer-sdk/pulls).


## License


[MIT](LICENSE)


**Free Software, Hell Yeah!**