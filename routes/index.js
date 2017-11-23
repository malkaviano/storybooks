'use strict';

const {ensureAuthenticated, ensureAuthorized} = require('../helpers/authenticate');

module.exports = function(router, Story) {
  router.get('/', (req, res) => {
    res.render('index/welcome');
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
            console.log(err);

            throw err;
          });
  });

  router.get('/about', (req, res) => {
    res.render('index/about');
  });

  return router;
};