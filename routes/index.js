'use strict';

const utils = require('../helpers/utils'),
      Story = require('../models/story').model,
      express = require('express'),
      router = express.Router();

module.exports = (function() {
  router.get('/', (req, res) => {
    res.render('index/welcome');
  });

  router.get('/about', (req, res) => {
    res.render('index/about');
  });
  
  router.get('/dashboard', utils.ensureAuthenticated, (req, res) => {
    Story.find({ author: req.session.userId })
          .then(stories => {
            res.render(
              'index/dashboard',
              { 
                stories: stories 
              }
            );
          })
          .catch(err => {
            utils.error(res, err);
          });
  });

  return router;
})();