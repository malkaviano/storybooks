'use strict';

const express = require('express'),
      path = require('path'),
      app = express(),
      parser = require('body-parser'),      
      session = require('./config/session'),
      flash = require('./config/flash'),
      methodOverride = require('method-override'),
      viewEngine = require('./config/handlebars');
      port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.use(session());

app.use(function(req, res, next) {
      res.locals.session = req.session;

      next();
});

app.use(flash());

app.use(methodOverride('_method'));

app.engine(
      viewEngine.extension,
      viewEngine.config()
);
  
app.set('view engine', viewEngine.extension);

const indexRouter = require('./routes/index')(express.Router()),
      authRouter = require('./routes/auth')(express.Router()),
      storiesRouter = require('./routes/stories')(express.Router());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/stories', storiesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
