'use strict';

const exphbs = require('express-handlebars'),
      {truncate, striptags, formatDate, selected} = require('../helpers/hbs');

module.exports = {
  config: function() {
    return exphbs({
      helpers: {
      truncate: truncate,
      striptags: striptags,
      formatDate: formatDate,
      selected: selected
      },
      defaultLayout: 'main' 
    });
  },
  extension: 'handlebars'
};