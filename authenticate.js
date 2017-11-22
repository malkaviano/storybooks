'use strict';

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.session.username) {
      return next();
    }
    
    res.redirect('/login');    
  },
  ensureAuthorized: function(obj, success, failure) {
    if (obj) {
      success();
    } else {
      failure();
    }
  }
}