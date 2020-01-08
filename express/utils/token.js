'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../../../config');

function createToken(user) {
  // Sign the JWT
  return jwt.sign(
    { id: user._id, username: user.username },
    secret,
    { algorithm: 'HS256', expiresIn: '1h' }
  );
}

module.exports = createToken;
