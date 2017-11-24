'use strict';

const defaults = require('./defaults.json'),
      connection = require('./mongodb').connection;

module.exports = function(app) {
  const session = require('express-session'),
        MongoStore = require('connect-mongo')(session),
        store = new MongoStore({ mongooseConnection: connection });

  store.clear(result => console.log(result));

  app.use(session({
    secret: process.env.SESSION,
    resave: defaults.sessionResave,
    saveUninitialized: defaults.sessionSaveUninitialized,
    store: store
  }));

  app.use(function(req,res,next){
    res.locals.session = req.session;

    next();
  });

  return session;
};