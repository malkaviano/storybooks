'use strict';

const defaults = require('./defaults.json'),
      //connection = require('./mongodb').connection,
      session = require('express-session'),
      //MongoStore = require('connect-mongo')(session),
      //store = new MongoStore({ mongooseConnection: connection })
      RedisStore = require('connect-redis')(session),
      redisClient = require('./redis'),
      store = new RedisStore({ client: redisClient })
;

//store.clear(result => console.log(result));

module.exports = session(
  {
    secret: process.env.SESSION,
    resave: defaults.sessionResave,
    saveUninitialized: defaults.sessionSaveUninitialized,
    store: store
  }
);