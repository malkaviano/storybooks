'use strict';

module.exports = function(router) {
  router.get('/', (req, res) => {
    res.render('stories/index');
  });

  router.get('/add', (req, res) => {
    res.render('stories/add');
  });

  return router;
};