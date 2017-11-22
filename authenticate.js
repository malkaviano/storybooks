'use strict';

const defaults = require('./config/defaults.json');

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.session.username) {
      return next();
    } else {
      req.session.requestedUrl = req.originalUrl;

      res.redirect(defaults.loginUrl); 
    }       
  },
  ensureAuthorized: {}
}