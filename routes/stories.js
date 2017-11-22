'use strict';

module.exports = function(router) {
  router.get('/', (req, res) => {
    res.render('stories/index');
  });

  router.post('/', (req, res) => {
    req.body.allowComments = !!req.body.allowComments;

    res.send(req.body);
  });

  router.get('/new', (req, res) => {
    res.render('stories/new');
  });

  return router;
};