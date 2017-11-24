'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      parser = require('body-parser'),      
      session = require('./config/session')(app),
      methodOverride = require('method-override'),
      port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.use(methodOverride('_method'));

require('./config/flash')(app);
require('./config/handlebars')(app);

const indexRouter = require('./routes/index')(express.Router()),
      authRouter = require('./routes/auth')(express.Router()),
      storiesRouter = require('./routes/stories')(express.Router());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/stories', storiesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
