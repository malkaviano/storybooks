'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      mongoose = require('./mongodb'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      User = require('./models/user')(mongoose),
      port = process.env.PORT || 3000,
      {ensureAuthenticated, ensureAuthorized} = require('./authenticate');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION || 'xpto_secret',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(function(req,res,next){
  res.locals.session = req.session;

  next();
});

app.get('/', (req, res) => {
  res.send(req.session.username);
});

app.get('/login', function(req, res) {
  res.redirect(url);
});

const authRouter = require('./routers/auth')(express.Router(), User);

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
