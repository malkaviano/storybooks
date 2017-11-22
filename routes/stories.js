'use strict';

module.exports = function(router, Story) {
  router.get('/', (req, res) => {
    res.render('stories/index');
  });

  router.post('/', (req, res) => {
    req.body.allowComments = !!req.body.allowComments;
    req.body.author = req.session.userId;

    new Story(req.body)
      .save()
      .then(story => {
        console.log(story);
      })
      .catch(err => {
        console.log(err);

        throw err;
      });

    res.send(req.body);
  });

  router.get('/new', (req, res) => {
    res.render('stories/new');
  });

  return router;
};