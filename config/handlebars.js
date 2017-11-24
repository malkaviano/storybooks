'use strict';

const exphbs = require('express-handlebars'),
      {truncate, formatDate, selected, htmlToText} = require('../helpers/hbs');

module.exports = {
  config: function() {
    return exphbs({
      helpers: {
      truncate: truncate,
      formatDate: formatDate,
      selected: selected,
      htmlToText: htmlToText
      },
      defaultLayout: 'main' 
    });
  },
  name: 'handlebars'
};