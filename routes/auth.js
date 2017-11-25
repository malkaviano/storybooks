'use strict';

const {url, oauth2Client, plus} = require('../config/google_oauth2'),
      defaults = require('../config/defaults.json'),
      User = require('../models/user').model,
      express = require('express'),
      router = express.Router(),
      utils = require('../helpers/utils');

module.exports = (function() {
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
      }

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
          }

          /*
          {
            "kind":"plus#person",
            "etag":"\"ucaTEV-ZanNH5M3SCxYRM0QRw2Y/ngrNt0K7A7t998awTosHkyzS48Q\"",
            "emails":[{"value":"rafael.kss@gmail.com","type":"account"}],
            "objectType":"person",
            "id":"116278152755049152404",
            "displayName":"Rafael Silva",
            "name":{"familyName":"Silva","givenName":"Rafael"},
            "image":
            {
              "url":"https://lh5.googleusercontent.com/-3-onQGpE9mk/AAAAAAAAAAI/AAAAAAAAAPI/qTsIzbggZMk/photo.jpg?sz=50",
              "isDefault":false
            },
            "isPlusUser":false,
            "language":"pt_BR",
            "ageRange":{"min":21},
            "verified":false
          }
          */
          
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
                    console.log(`DB Error: ${err}`);

                    throw err;
                  });
                }

                req.session.userId = user._id;
                req.session.username = user.name;
                req.session.email = user.email;
                
                res.redirect(req.session.requestedUrl || defaults.loginRedirect);
              })
              .catch(err => {
                console.log(`DB Error: ${err}`);

                throw err;
              });
        }
      );
    });
  });

  return router;
})();