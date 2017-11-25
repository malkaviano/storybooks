'use strict';

const utils = require('../helpers/utils'),
      Story = require('../models/story'),
      express = require('express'),
      router = express.Router({mergeParams: true});

function registerRoutes() {
  router.post('/new', utils.ensureAuthenticated, (req, res) => {
    res.redirect(`/stories/${req.params.storyId}`)
  });

  return router;
}

module.exports = registerRoutes();