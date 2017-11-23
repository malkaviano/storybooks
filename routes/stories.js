'use strict';

const {ensureAuthenticated, ensureAuthorized} = require('../helpers/authenticate');

module.exports = function(router, Story) {
  router.get('/', (req, res) => {
    Story.find({ status: "public" })
          .populate('author')
          .then(stories => {
            res.render(
              'stories/index',
              {
                stories: stories
              }
            );
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

        res.redirect('/stories');
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

    Story.findOne({ _id: req.params.id, status: "public" })
          .populate('author')
          .then(story => {
            res.render(
              'stories/show', {
              story: story
            });
          })
          .catch(err => {
            console.log(err);
            
            throw err;
          });
  });

  router.delete('/:id', (req, res) => {

    Story.remove({ _id: req.params.id })
    .then(() => {
      //res.flash('info_msg', 'Idea was deleted!');

      res.redirect('/dashboard')
    })
    .catch(err => {
      console.log(err);
      
      throw err;
    });          
  });

  return router;
};