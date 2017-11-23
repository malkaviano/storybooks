'use strict';

const exphbs = require('express-handlebars'),
      {truncate, striptags, formatDate} = require('../helpers/hbs');

module.exports = function(app) {
  app.engine(
    'handlebars',
    exphbs({
      helpers: {
        truncate: truncate,
        striptags: striptags,
        formatDate: formatDate
      },
      defaultLayout: 'main' 
    })
  );

  app.set('view engine', 'handlebars');

  return app;
}