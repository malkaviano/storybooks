'use strict';

const {url, oauth2Client, plus} = require('../config/google_oauth2'),
      defaults = require('../config/defaults.json'),
      User = require('../models/user').model,
      express = require('express'),
      router = express.Router(),
      utils = require('../helpers/utils');

function register() {
  router.get('/login', function(req, res) {

    if(req.query.return) req.session.requestedUrl = req.query.return;

    res.redirect(url);
  });

  router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      if(err) {
        utils.error(res, err, 'Error logging out');
      } else {
        res.redirect(defaults.logoutRedirect);
      }
    });
  });

  router.get('/google', function(req, res) {
    const code = req.query.code;

    oauth2Client.getToken(code, function (err, tokens) {
      if(err) {
        utils.error(res, err, 'Error logging in');
      } else {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        oauth2Client.setCredentials(tokens);

        plus.people.get(
          {
            userId: defaults.plusUserId,
            auth: oauth2Client
          },
          function (err, profile) {
            if(err) {
              utils.error(res, err, 'Error logging in');

              return;
            } else {
              User.findOne({ googleId: profile.id })
                  .then(user => {
                    if(!user) {
                      new User(
                        {
                          googleId: profile.id,
                          name: profile.displayName,
                          email: profile.emails[0].value,
                          image: profile.image.url
                        }
                      ).save()
                      .then(newUser => {
                        user = newUser;
                      })
                      .catch(err => {
                        utils.error(res, err, 'DB Error');
                      });
                    } else {
                      req.session.userId = user._id;
                      req.session.username = user.name;
                      req.session.email = user.email;
                      
                      res.redirect(req.session.requestedUrl || defaults.loginRedirect);
                    }                
                  })
                  .catch(err => {
                    utils.error(res, err, 'DB Error');
                  });
            }
        });
      }
    });
  });

  return router;
}

module.exports = register();