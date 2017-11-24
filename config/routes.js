'use strict';

const index = require('../routes/index'),
      auth = require('../routes/auth'),
      stories = require('../routes/stories');

module.exports = {
  index: { path: "/", router: index },
  auth: { path: "/auth", router: auth },
  stories: { path: "/stories", router: stories }
};