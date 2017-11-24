'use strict';

const {ensureAuthenticated, ensureAuthorized} = require('../helpers/authenticate'),
      utils = require('../helpers/utils');

module.exports = function(router, Story) {
  router.get('/', (req, res) => {
    res.render('index/welcome');
  });

  router.get('/about', (req, res) => {
    res.render('index/about');
  });
  
  router.get('/dashboard', ensureAuthenticated, (req, res) => {
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
};