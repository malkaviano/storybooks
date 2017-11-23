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
  });

  router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('stories/new');
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;

    Story.find({ _id: id, status: "public" })
          .populate('author')
          .then(stories => {
            res.render(
              'stories/show', {
              stories: stories
            });
          })
          .catch(err => {
            console.log(err);
            
            throw err;
          });
  });

  return router;
};