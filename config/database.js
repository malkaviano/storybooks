'use strict';

if(process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://vidjot_user:vidjotmongo@ds113775.mlab.com:13775/vidjot-prod'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://story_user:storymongo@ds119355.mlab.com:19355/storybooks-dev'
  }
}