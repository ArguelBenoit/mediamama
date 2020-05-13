const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: false,
    index: {
      unique: true
    }
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user', userModel);
