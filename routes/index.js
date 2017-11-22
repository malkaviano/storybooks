'use strict';

module.exports = function(router) {
  router.get('/', (req, res) => {
    res.render('index/welcome');
  });

  return router;
};