'use strict';

const exphbs = require('express-handlebars'),
      {truncate, striptags, formatDate, selected} = require('../helpers/hbs');

module.exports = function(app) {
  app.engine(
    'handlebars',
    exphbs({
      helpers: {
        truncate: truncate,
        striptags: striptags,
        formatDate: formatDate,
        selected: selected
      },
      defaultLayout: 'main' 
    })
  );

  app.set('view engine', 'handlebars');

  return app;
}