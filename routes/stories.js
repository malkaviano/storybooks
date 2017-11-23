'use strict';

const {ensureAuthenticated, ensureAuthorized} = require('../helpers/authenticate');

module.exports = function(router, Story) {
  router.get('/', (req, res) => {
    Story.find({ status: "public" })
          .populate('author')
          .then(stories => {
            res.render(
              'stories/index', {
                stories: stories
              });
          })
          .catch(err => {
            console.log(err);
            
            throw err;
          });
  });

  router.post('/', ensureAuthenticated, (req, res) => {
    req.body.allowComments = !!req.body.allowComments;
    req.body.author = req.session.userId;

    new Story(req.body)
      .save()
      .then(story => {
        console.log(story);

        redirect('/stories');
      })
      .catch(err => {
        console.log(err);

        throw err;
      });

    res.send(req.body);
  });

  router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('stories/new');
  });

  return router;
};