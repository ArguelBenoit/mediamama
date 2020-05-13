'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  sexe: { type: String, required: true },
  birthday: { type: Date, required: true },
  password: { type: String, required: true },
  registration: { type: Date, required: true },
  admin: { type: Boolean, required: true }
});

module.exports = mongoose.model('User', userModel);
