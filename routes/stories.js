'use strict';

const {ensureAuthenticated, ensureAuthorized} = require('../helpers/authenticate'),
      utils = require('../helpers/utils'),
      Story = require('./models/story')(mongoose).model;

module.exports = function(router) {
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
            utils.error(res, err);
          });
  });

  router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('stories/new');
  });

  router.post('/', ensureAuthenticated, (req, res) => {
    req.body.allowComments = !!req.body.allowComments;
    req.body.author = req.session.userId;

    const story = new Story(req.body);
    
    story.save()
          .then(
            story => {
              res.flash('info_msg', 'Story was created');

              res.redirect('/dashboard');
            }
          )
          .catch(err => {
            const errors = [];        

            for(const prop in err.errors) {
              errors.push({ message: err.errors[prop].message });
            }

            res.render('stories/new', { errors: errors, story: story });
          });
  });

  router.get('/:id', (req, res) => {

    Story.findOne({ _id: req.params.id, status: "public" })
          .populate('author')
          .then(story => {
            if(story) {
              res.render(
                'stories/show',
                {
                  story: story
                }
              );
            } else {
              utils.error(res, `ID: ${req.params.id} - Public`, "Public Story was not found");
            }
          })
          .catch(err => {
            utils.error(res, err);
          });
  });

  router.get('/:id/edit', ensureAuthenticated, (req, res) => {
     
    utils.resolvePromise(
      utils.findUserStory(Story, req.params.id, req.session.userId),
      story => {
        if(story) {
          res.render(
            'stories/edit',
            {
              story: story
            }
          );
        } else {
          utils.error(res, `ID: ${req.params.id} - User: ${req.session.userId}`, "User Story was not found");
        }
      },
      err => {
        utils.error(res, err);
      }
    );
  });
  
  router.patch('/:id', ensureAuthenticated, (req, res) => {
    
    Story.update(
      { _id: req.params.id, author: req.session.userId },
      { $set: 
        { 
          title: req.body.title,
          status: req.body.status,
          description: req.body.description,
          allowComments: req.body.allowComments,
        }
      }
    )
    .then(
      story => {
        res.flash('info_msg', 'Story was modified');

        res.redirect('/dashboard');
      }
    ).catch(err => {
      utils.error(res, err);
    });
  });

  router.delete('/:id', ensureAuthenticated, (req, res) => {

    Story.remove({ _id: req.params.id })
    .then(() => {
      res.flash('info_msg', 'Story was deleted');

      res.redirect('/dashboard')
    })
    .catch(err => {
      utils.error(res, err);
    });          
  });

  return router;
};