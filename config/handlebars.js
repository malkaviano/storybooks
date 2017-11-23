'use strict';

const exphbs = require('express-handlebars'),
      {truncate, stripTags} = require('../helpers/hbs');

module.exports = function(app) {
  app.engine(
    'handlebars',
    exphbs({
      helpers: {
        truncate: truncate,
        stripTags: stripTags
      },
      defaultLayout: 'main' 
    })
  );

  app.set('view engine', 'handlebars');

  return app;
}