'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      mongoose = require('./config/mongodb'),
      User = require('./models/user')(mongoose),
      session = require('./config/session')(app, mongoose.connection),
      port = process.env.PORT || 3000,
      {ensureAuthenticated, ensureAuthorized} = require('./authenticate');

app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index')(express.Router()),
      authRouter = require('./routes/auth')(express.Router(), User);

app.use('/', indexRouter);
app.use('/auth', authRouter);

require('./config/handlebars');

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
