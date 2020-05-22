'use strict';

const bcrypt = require('bcryptjs');

function hashPassword(password, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => callback(err, hash));
  });
}

module.exports = hashPassword;
