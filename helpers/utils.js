'use strict';

const defaults = require('../config/defaults.json');

function logErrorAndRedirect(res, log, msg = 'Invalid Operation', redirectUrl = '/') {
  console.log(log);
  
  res.flash('error_msg', msg);
  
  res.redirect(redirectUrl);
}

function fillObject(obj, values) {
  for(const prop in obj) {
    if(values[prop] !== undefined) {
      obj[prop] = values[prop];
    }
  }

  return obj;
}

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.session.username) {
      return next();
    }
    
    req.session.requestedUrl = req.originalUrl;

    res.redirect(defaults.loginUrl);       
  },
  error: logErrorAndRedirect,
  resolvePromise: (promise, resolve, error) => {
    promise.then(resolve)
            .catch(error);
  },
  fillObject: fillObject,
  setUserSession: (session, user) => {
    console.log('Setting user session');
    session.userId = user.id;
    session.username = user.name;
    session.email = user.email;
  }
}