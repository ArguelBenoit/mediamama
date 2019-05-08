'use strict';

const Boom = require('boom');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

function verifyUniqueUser(req, res) {
  // Find an entry from the database that
  // matches either the email or username
  User.findOne(
    {
      $or: [{ email: req.payload.email }, { username: req.payload.username }]
    },
    (err, user) => {
      // Check whether the username or email
      // is already taken and error out if so
      if (user) {
        if (user.username === req.payload.username) {
          res(Boom.badRequest('Username taken'));
          return;
        }
        if (user.email === req.payload.email) {
          res(Boom.badRequest('Email taken'));
          return;
        }
      }
      // If everything checks out, send the payload through
      // to the route handler
      res(req.payload);
    }
  );
}

function verifyCredentials(req, res) {
  const password = req.payload.password;

  // Find an entry from the database that
  // matches either the email or username
  User.findOne(
    {
      $or: [{ email: req.payload.email }, { username: req.payload.username }]
    },
    (err, user) => {
      if (!user) {
        return res(Boom.badRequest('Incorrect username or email!'));
      }
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          return res(user);
        }
        res(Boom.badRequest('Incorrect username or email!'));
      });
    }
  );
}

module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials
};
