# Beer-Sdk
[![Build Status](https://travis-ci.com/hunandika/beer-sdk.svg?branch=master)](https://travis-ci.com/hunandika/beer-sdk)
[![codecov](https://codecov.io/gh/hunandika/beer-sdk/branch/master/graph/badge.svg?token=1D62LYXFWD)](https://codecov.io/gh/hunandika/beer-sdk)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/e46a8f37c44a4057b0499f12c6ea723f)](https://www.codacy.com/gh/hunandika/beer-sdk/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hunandika/beer-sdk&amp;utm_campaign=Badge_Grade)
[![CodeFactor](https://www.codefactor.io/repository/github/hunandika/beer-sdk/badge)](https://www.codefactor.io/repository/github/hunandika/beer-sdk)
[![Known Vulnerabilities](https://snyk.io/test/github/hunandika/beer-sdk/badge.svg)](https://snyk.io/test/github/hunandika/beer-sdk)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Wrapper package Node.js app most used for backend services

This is just a collection list node js package most used. If you create node js from scratch you can avoid DRY (Don't Repeat Yourself) to configure like logger, cache, etc..

## Features

- Logging: using [bunyan](https://www.npmjs.com/package/bunyan)
    - [bunyan-slack](https://www.npmjs.com/package/bunyan-slack)
    - [bunyan-debug-stream](https://www.npmjs.com/package/bunyan-debug-stream)
- Cache: using [cache-manager](https://www.npmjs.com/package/cache-manager)
    - [cache-manager-redis-store](https://www.npmjs.com/package/cache-manager-redis-store)
    - Cache memory
- MongPlug: Mongoose Plugins
    - toJSON
    - Paginate

## Installation

npm install sdk@npm:beer-sdk --save

or

yarn add sdk@npm:beer-sdk

## Usage Examples

Please attach this code to root/parent js code.
See examples below on how to implement the Beer sdk.

### Index.js or App.js

    require('sdk');

#### *Note: this code just only called only once in root js project

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
    function getUser(id, cb) {
    	setTimeout(function () {
			sdkLog.info('Returning user from slow database.');
			cb(null, { id: id, name: 'Bob' });
    	}, 100);
    }
    
    var userId = 123;
    var key = 'user_' + userId;
    
    // Note: ttl is optional in wrap()
    sdkCache.wrap(key, function (cb) {
    	getUser(userId, cb);
    }, { ttl: 5 }, function (err, user) {
    	sdkLog.info(user);
    })
    
    // Second time fetches user from memoryCache
    sdkCache.wrap(key,function (cb) {
    	getUser(userId, cb);
    }, function (err, user) {
    	sdkLog.info(user);
    });

### Custom Mongoose Plugins
`sdkMongplug` is mongoose plugins that you can attach to any mongoose model schema.

    const mongoose = require('mongoose');

    const userSchema = mongoose.Schema(
    {
        /* schema definition here */
    },
    { timestamps: true }
    );

    userSchema.plugin(sdkMongplug.toJSON);
    userSchema.plugin(sdkMongplug.paginate);

    const User = mongoose.model('User', userSchema);

### toJSON
The toJSON plugin applies transform to JSON format and removes field following __v, createdAt, updatedAt, and any schema path that has private: true
replaces _id with id

### paginate
The paginate plugin adds the `paginate` static method to the mongoose schema.

Adding this plugin to the `User` model schema will allow you to do the following:

    const queryUsers = async (filter, options) => {
        const users = await User.paginate(filter, options);
        return users;
    };

The `filter` param is a regular mongo filter.

The `options` param can have the following (optional) fields:

    const options = {
        sortBy: 'name:desc', // sort order
        limit: 5, // maximum results per page
        page: 2, // page number
    };

The plugin also supports sorting by multiple criteria (separated by a comma): `sortBy: name:desc,role:asc`

The `paginate` method returns a Promise, which fulfills with an object having the following properties:

    {
        "results": [],
        "page": 2,
        "limit": 5,
        "totalPages": 10,
        "totalResults": 48
    }

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
      
    //NODE_ENV = development
    SDK_CACHE_MEMORY_ENABLE=true
    SDK_CACHE_REDIS_ENABLE=false
      
    //NODE_ENV = production
    SDK_CACHE_MEMORY_ENABLE=false
    SDK_CACHE_REDIS_ENABLE=false

##### *Note: You can override this config with adding to .env your project using prefix SDK_

## Contribution

Want to help improve this package? We take [pull requests](https://github.com/hunandika/beer-sdk/pulls).

## License

[MIT](LICENSE)

**Free Software, Hell Yeah!**