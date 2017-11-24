'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      parser = require('body-parser'),
      mongoose = require('./config/mongodb'),
      User = require('./models/user')(mongoose),
      Story = require('./models/story')(mongoose),
      session = require('./config/session')(app, mongoose.connection),
      methodOverride = require('method-override'),
      port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.use(methodOverride('_method'));

const indexRouter = require('./routes/index')(express.Router(), Story),
      authRouter = require('./routes/auth')(express.Router(), User),
      storiesRouter = require('./routes/stories')(express.Router(), Story);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/stories', storiesRouter);

require('./config/handlebars')(app);
require('./config/flash')(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
