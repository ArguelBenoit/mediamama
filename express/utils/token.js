'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../secret');

function createToken(user) {
  const userObject = {
    id: user._id,
    username: user.username
  };
  const jwtObject = {
    algorithm: 'HS256',
    expiresIn: '1h'
  };
  return jwt.sign(userObject, secret, jwtObject);
}

module.exports = createToken;
