'use strict';

const utils = require('../helpers/utils'),
      Story = require('../models/story'),
      express = require('express'),
      router = express.Router({mergeParams: true});

function registerRoutes() {
  router.post('/new', utils.ensureAuthenticated, (req, res) => {

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
            utils.error(res, err);
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