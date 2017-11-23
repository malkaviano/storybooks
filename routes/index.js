'use strict';

const {ensureAuthenticated, ensureAuthorized} = require('../helpers/authenticate');

module.exports = function(router) {
  router.get('/', (req, res) => {
    res.render('index/welcome');
  });

  router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('index/dashboard');
  });

  router.get('/about', (req, res) => {
    res.render('index/about');
  });

  return router;
};