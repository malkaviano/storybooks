'use strict';

const defaults = require('./defaults.json'),
      connection = require('./mongodb').connection
;

//store.clear(result => console.log(result));

module.exports = function() {
  const session = require('express-session'),
        //MongoStore = require('connect-mongo')(session),
        //store = new MongoStore({ mongooseConnection: connection })
        RedisStore = require('connect-redis')(session),
        redisClient = require('./redis'),
        store = new RedisStore({ client: redisClient })
  ;

  return session(
    {
      secret: process.env.SESSION,
      resave: defaults.sessionResave,
      saveUninitialized: defaults.sessionSaveUninitialized,
      cookie: { secure: defaults.cookieSecure },
      store: store
    }
  );
};