'use strict';

const indexRouter = require('./routes/index'),
      authRouter = require('./routes/auth'),
      storiesRouter = require('./routes/stories');

module.exports = {
  indexRouter: indexRouter,
  authRouter: authRouter,
  storiesRouter: storiesRouter
};