'use strict';

const utils = require('../helpers/utils'),
      Story = require('../models/story'),
      express = require('express'),
      router = express.Router({mergeParams: true});

function registerRoutes() {
  
  return router;
}

module.exports = registerRoutes();