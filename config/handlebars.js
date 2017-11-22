'use strict';

const exphbs = require('express-handlebars');

module.exports = function(app) {
  app.engine(
    'handlebars',
    exphbs({ defaultLayout: 'main' })
  );

  app.set('view engine', 'handlebars');

  return app;
}