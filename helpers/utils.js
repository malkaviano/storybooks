'use strict';

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
  error: logErrorAndRedirect,
  resolvePromise: (promise, resolve, error) => {
    promise.then(resolve)
            .catch(error);
  },
  fillObject: fillObject
}