'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const {url, oauth2Client} = require('./config/google_oauth2');

app.get('/login', function(req, res) {
  res.redirect(url);
});

app.get('/auth/google', function(req, res) {
  const code = req.query.code;

  oauth2Client.getToken(code, function (err, tokens) {
    if(err) throw err;

    // Now tokens contains an access_token and an optional refresh_token. Save them.
    oauth2Client.setCredentials(tokens);

    res.send(tokens);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
