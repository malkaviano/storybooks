'use strict';

const defaults = require('./defaults.json'),
      connection = require('./mongodb').connection,
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      store = new MongoStore({ mongooseConnection: connection }),
      store = new RedisStore({ client: redisClient })
;

store.clear(result => console.log(result));

module.exports = function() {

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