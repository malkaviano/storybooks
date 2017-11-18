'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const url = require('./config/google_oauth2');

app.get('/login', function(req, res) {
  res.redirect(url);
});

app.get('/auth/google', function(req, res) {
  const code = req.params.code;

  res.send(code);
  
  oauth2Client.getToken(code, function (err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if (!err) {
      oauth2Client.setCredentials(tokens);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
