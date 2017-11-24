'use strict';

const flash = require('express-flash-2');

module.exports = app => {
  app.use(flash());

  return app;
}