'use strict';

const exphbs = require('express-handlebars'),
      hbsHelper = require('../helpers/hbs');

module.exports = {
  config: function() {
    return exphbs(
      {
        helpers: {
          truncate: hbsHelper.truncate,
          formatDate: hbsHelper.formatDate,
          selected: hbsHelper.selected,
          htmlToText: hbsHelper.htmlToText,
          showEditIcon: hbsHelper.showEditIcon
        },
        defaultLayout: 'main' 
      }
    );
  },
  name: 'handlebars'
};