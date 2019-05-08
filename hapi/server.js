'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const secret = require('./config');

const server = new Hapi.Server();
server.connection({
  port: 8000,
  host: '0.0.0.0',
  routes: {
    cors: true
  }
});

server.register(require('hapi-auth-jwt'), () => {
  // We are giving the strategy a name of 'jwt'
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: secret,
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
  glob
    .sync('api/**/routes/*.js', {
      root: __dirname
    })
    .forEach(file => {
      const route = require(path.join(__dirname, file));
      server.route(route);
    });
});

// Start the server
server.start(err => {
  if (err) {
    throw err;
  }
  // Once started, connect to Mongo through Mongoose
  mongoose.connect('mongodb://mongo:27017/hapi', {}, err => {
    if (err) {
      throw err;
    }
  });
});
