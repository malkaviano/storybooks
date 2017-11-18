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
  console.log(req.params);

  res.send('Loged');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
