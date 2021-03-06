'use strict';

const express = require('express'),
      app = express(),
      path = require('path'),
      //parser = require('body-parser'),
      methodOverride = require('method-override'),
      session = require('./config/session'),
      flash = require('express-flash-2'),      
      viewEngine = require('./config/handlebars'),
      routes = require('./config/routes'),
      helmet = require('helmet'),
      port = process.env.PORT || 3000;

app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session);

app.use(function(req, res, next) {
      res.locals.session = req.session;

      next();
});

app.use(flash());

app.use(methodOverride('_method'));

app.engine(viewEngine.name, viewEngine.config());
app.set('view engine', viewEngine.name);

for(const name in routes) {
      app.use(routes[name].path, routes[name].router);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
