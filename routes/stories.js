'use strict';

module.exports = function(router) {
  router.get('/', (req, res) => {
    res.render('stories/index');
  });

  return router;
};