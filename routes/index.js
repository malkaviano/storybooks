'use strict';

module.exports = function(router) {
  router.get('/', (req, res) => {
    res.send(req.session.username);
  });

  return router;
};