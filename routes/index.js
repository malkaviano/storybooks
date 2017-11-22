'use strict';

module.exports = function(router) {
  app.get('/', (req, res) => {
    res.send(req.session.username);
  });

  return router;
};