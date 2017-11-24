'use strict';

module.exports = {
  error: (res, log, msg = 'Invalid Operation', redirectUrl = '/') => {
    console.log(log);
    
    res.flash('error_msg', msg);
    
    res.redirect(redirectUrl);
  },
  findUserStory: (Story, id, userId) => {
    return Story.findOne({ _id: id, author: userId })
                .populate('author');
  },
  resolvePromise: (promise, resolve, error) => {
    promise.then(resolve)
            .catch(error);
  }
}