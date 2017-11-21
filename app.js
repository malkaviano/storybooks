'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      mongoose = require('./mongodb'),
      User = require('./models/user')(mongoose),
      port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const {url, oauth2Client, plus} = require('./config/google_oauth2');

app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/login', function(req, res) {
  res.redirect(url);
});

app.get('/auth/google', function(req, res) {
  const code = req.query.code;

  oauth2Client.getToken(code, function (err, tokens) {
    if(err) {
      res.send(`Code error: ${err}`);
      return;
      //throw err;
    }

    // Now tokens contains an access_token and an optional refresh_token. Save them.
    oauth2Client.setCredentials(tokens);

    plus.people.get(
      {
        userId: 'me',
        auth: oauth2Client
      },
      function (err, profile) {
        if(err) {
          res.send(`Plus error: ${err}`);
          return;

          //throw err;
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
        
        User.findOne({ googleId: profile.googleId })
            .then(user => {
              if(user) {
                res.send(`User found: ${user}`);

                return;
              }

              new User(
                {
                  googleId: profile.id,
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  image: profile.image.url
                }
              ).save()
              .then(user => {
                res.send(`New User: ${user}`);
              })
              .catch(err => res.send(`DB Error: ${err}`));
            })
            .catch(err => res.send(`DB Error: ${err}`));
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
