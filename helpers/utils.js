'use strict';

module.exports = {
  error: (res, log, msg = 'Invalid Operation', redirectUrl = '/') => {
    console.log(log);
    
    res.flash('error_msg', msg);
    
    res.redirect(redirectUrl);
  },
  resolvePromise: (promise, resolve, error) => {
    promise.then(resolve)
            .catch(error);
  }
}