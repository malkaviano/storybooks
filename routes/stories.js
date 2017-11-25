'use strict';

const utils = require('../helpers/utils'),
      Story = require('../models/story'),
      express = require('express'),
      router = express.Router(),
      commentsRouter = require('./comments');

router.use('/:storyId/comments', commentsRouter);

function registerRoutes() {
  router.get('/new', utils.ensureAuthenticated, (req, res) => {
    res.render('stories/new');
  });
  
  router.get('/', (req, res) => {

    utils.resolvePromise(
      Story.findPublicStories(),
      stories => {
        res.render(
          'stories/index',
          {
            stories: stories
          }
        );
      },
      err => {
        utils.error(res, err);
      }
    );

  });

  router.get('/:id', (req, res) => {

    utils.resolvePromise(
      Story.findPublicOrOwnStory(req.params.id, req.session.userId),
      story => {
        if(story) {
          story.comments.sort((c1, c2) => {
            if(c1.commentDate > c2.commentDate) return -1;

            if(c1.commentDate < c2.commentDate) return 1;

            return 0;
          });

          res.render(
            'stories/show',
            {
              story: story,
              back: (req.query.return || "stories")
            }
          );
        } else {
          utils.error(res, `ID: ${req.params.id} - Public`, "Story was not found");
        }
      },
      err => {
        utils.error(res, err);
      }
    );

  });

  router.get('/:id/edit', utils.ensureAuthenticated, (req, res) => {
      
    utils.resolvePromise(
      Story.findUserStory(req.params.id, req.session.userId),
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
  
  router.get('/user/:id', utils.ensureAuthenticated, (req, res) => {

    utils.resolvePromise(
      Story.findUserStories(req.params.id),
      stories => {
        res.render(
          'stories/index',
          {
            stories: stories
          }
        );
      },
      err => {
        utils.error(res, err);
      }
    );
  });

  router.get('/my', , utils.ensureAuthenticated, (req, res) => {
    res.redirect(`stories/user/${req.session.userId}`);
  });

  router.post('/', utils.ensureAuthenticated, (req, res) => {
    
      req.body.allowComments = !!req.body.allowComments;
      req.body.author = req.session.userId;
  
      const newStory = new Story(req.body);
      
      utils.resolvePromise(
        newStory.save(),
        story => {
          res.flash('info_msg', 'Story was created');
  
          res.redirect('/dashboard');
        },
        err => {
          const errors = [];        
  
          for(const prop in err.errors) {
            errors.push({ message: err.errors[prop].message });
          }
  
          res.render('stories/new', { errors: errors, story: newStory });
        }
      );
  
  });

  router.patch('/:id', utils.ensureAuthenticated, (req, res) => {
    
    req.body.allowComments = !!req.body.allowComments;

    utils.resolvePromise(
      Story.findUserStory(req.params.id, req.session.userId),
      story => {
        utils.fillObject(story, req.body);

        utils.resolvePromise(
          story.save(),
          saved => {
            res.flash('info_msg', 'Story was modified');
            
            res.redirect('/dashboard');
          },
          err => {
            const errors = [];        
    
            for(const prop in err.errors) {
              errors.push({ message: err.errors[prop].message });
            }
    
            res.render('stories/edit', { errors: errors, story: story });
          }
        );        
      },
      err => {
        utils.error(res, err);
      }
    );

  });

  router.delete('/:id', utils.ensureAuthenticated, (req, res) => {

    utils.resolvePromise(
      Story.removeUserStory(req.params.id, req.session.userId),
      () => {
        res.flash('info_msg', 'Story was deleted');

        res.redirect('/dashboard')
      },
      err => {
        utils.error(res, err);
      }
    );          

  });

  return router;
}

module.exports = registerRoutes();