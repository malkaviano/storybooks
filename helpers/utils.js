'use strict';

function logErrorAndRedirect(res, log, msg = 'Invalid Operation', redirectUrl = '/') {
  console.log(log);
  
  res.flash('error_msg', msg);
  
  res.redirect(redirectUrl);
}

module.exports = {
  error: logErrorAndRedirect,
  resolvePromise: (promise, resolve, error) => {
    promise.then(resolve)
            .catch(error);
  }
}