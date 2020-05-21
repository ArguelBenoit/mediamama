'use strict';

const jwt = require('jsonwebtoken');
import config from '../../config';

function createToken(user) {
  const userObject = {
    id: user._id,
    username: user.username
  };
  const jwtObject = {
    algorithm: 'HS256',
    expiresIn: '1h'
  };
  return jwt.sign(userObject, config.secret, jwtObject);
}

module.exports = createToken;
