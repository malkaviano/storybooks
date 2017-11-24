'use strict';

const {ensureAuthenticated, ensureAuthorized} = require('../helpers/authenticate'),
      utils = require('../helpers/utils'),
      Story = require('../models/story'),
      express = require('express'),
      router = express.Router();

module.exports = (function() {
  router.get('/', (req, res) => {

    utils.resolvePromise(
      Story.helper.findPublicStories(),
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

  router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('stories/new');
  });

  router.post('/', ensureAuthenticated, (req, res) => {

    req.body.allowComments = !!req.body.allowComments;
    req.body.author = req.session.userId;

    const newStory = new Story.model(req.body);
    
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

  router.get('/:id', (req, res) => {

    utils.resolvePromise(
      Story.helper.findPublicStory(req.params.id),
      story => {
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
      },
      err => {
        utils.error(res, err);
      }
    );

  });

  router.get('/:id/edit', ensureAuthenticated, (req, res) => {
     
    utils.resolvePromise(
      Story.helper.findUserStory(req.params.id, req.session.userId),
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
    
    req.body.allowComments = !!req.body.allowComments;

    utils.resolvePromise(
      Story.helper.findUserStory(req.params.id, req.session.userId),
      story => {
        story.title = req.body.title,
        story.status = req.body.status,
        story.description = req.body.description,
        story.allowComments = req.body.allowComments,
        
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

  router.delete('/:id', ensureAuthenticated, (req, res) => {

    utils.resolvePromise(
      Story.helper.removeUserStory(req.params.id, req.session.userId),
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
})();