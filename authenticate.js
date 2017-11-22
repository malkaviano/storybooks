'use strict';

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.session.username) {
      return next();
    } else {
      console.log(req.baseUrl);
      
      req.session.requested_url = req.baseUrl;

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