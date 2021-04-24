
# Beer-Sdk
## Wrapper package Node.js app most used for backend services

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This is just a collection list node js package most used. If you create node js from scratch you can avoid DRY (Don't Repeat Yourself) to configure like logger, cache, etc..

## Features

 - Logging: using [bunyan](https://www.npmjs.com/package/bunyan)
	 - [bunyan-slack](https://www.npmjs.com/package/bunyan-slack)
	 - [bunyan-debug-stream](https://www.npmjs.com/package/bunyan-debug-stream)
 - Cache: using [cache-manager](https://www.npmjs.com/package/cache-manager)
	 - [cache-manager-mongodb](https://www.npmjs.com/package/cache-manager-mongodb)
	 - [cache-manager-redis-store](https://www.npmjs.com/package/cache-manager-redis-store)
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
    
    sdkLog.trace('trace log')
    sdkLog.debug('debug log')
    sdkLog.info('info log')
    sdkLog.warn('warn log')
    sdkLog.error('error log')
    sdkLog.fatal('fatal log')
  

### Cache-Manager
    // cache example
    function  getUser(id, cb) {
	    setTimeout(function () {
			sdkLog.info('Returning user from slow database.');
			cb(null, { id:  id, name:  'Bob' });
		}, 100);
	}   
	var  userId = 123;
	var  key = 'user_' + userId;

	// Note: ttl is optional in wrap()
		sdkCache.wrap(key, function (cb)  {
			getUser(userId, cb);
		}, { ttl: 5 }, function (err,  user) {
		 sdkLog.info(user);
		})
		
	// Second time fetches user from memoryCache 
		sdkCache.wrap(key,function (cb) {
			getUser(userId, cb);
		}, function (err, user) {
			sdkLog.info(user);
		});
		 
## Environment Variables
Please use 

## Contribution

Want to help improve this package? We take  [pull requests](https://github.com/hunandika/beer-sdk/pulls).


## License

[MIT](LICENSE)

**Free Software, Hell Yeah!**

