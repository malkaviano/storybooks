'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      mongoose = require('./mongodb'),
      User = require('./models/user')(mongoose),
      session = require('./config/session')(app, mongoose.connection),
      port = process.env.PORT || 3000,
      {ensureAuthenticated, ensureAuthorized} = require('./authenticate');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(req.session.username);
});

const authRouter = require('./routers/auth')(express.Router(), User);

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
