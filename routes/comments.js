'use strict';

const utils = require('../helpers/utils'),
      Story = require('../models/story'),
      express = require('express'),
      router = express.Router({mergeParams: true});

function registerRoutes() {
  router.post('/', utils.ensureAuthenticated, (req, res) => {

    utils.resolvePromise(
      Story.findPublicOrOwnStory(req.params.storyId),
      story => {
        const newComment = {
          commentText: req.body.commentText,
          commentUser: req.session.userId
        }
        
        story.comments.push(newComment);

        utils.resolvePromise(
          story.save(),
          saved => {
            res.flash('info_msg', 'Comment saved');

            res.redirect(`/stories/${req.params.storyId}`);
          },
          err => {
            const errors = [];        
            
            for(const prop in err.errors) {
              errors.push({ message: err.errors[prop].message });
            }
    
            res.render('stories/show', { errors: errors, story: story });
          }
        );
      },
      err => {
        utils.error(res, err);
      }
    );

  });

  return router;
}

module.exports = registerRoutes();