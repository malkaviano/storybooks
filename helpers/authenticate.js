'use strict';

const defaults = require('../config/defaults.json');

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.session.username) {
      console.log(req.session.username);

      return next();
    } else {
      req.session.requestedUrl = req.originalUrl;

      console.log(req.session.requestedUrl);

      res.redirect(defaults.loginUrl); 
    }       
  },
  ensureAuthorized: {}
}