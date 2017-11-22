'use strict';

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.session.username) {
      return next();
    } else {
      req.session.requestedUrl = req.originalUrl;

      res.redirect(`/auth/login`); 
    }       
  },
  ensureAuthorized: function(obj, success, failure) {
    if (obj) {
      success();
    } else {
      failure();
    }
  }
}