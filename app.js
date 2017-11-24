'use strict';

const app = require('express')(),
      path = require('path'),
      parser = require('body-parser'),      
      session = require('./config/session'),
      flash = require('./config/flash'),
      methodOverride = require('method-override'),
      viewEngine = require('./config/handlebars'),
      routes = require('./config/routes'),
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

app.engine(viewEngine.name, viewEngine.config());
app.set('view engine', viewEngine.name);

app.use('/', routes.indexRouter);
app.use('/auth', routes.authRouter);
app.use('/stories', routes.storiesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
