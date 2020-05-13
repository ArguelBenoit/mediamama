'use strict';

const Joi = require('joi');

const createUserSchema = Joi.object({
  // alpha-numeric characters space and coma
  username: Joi.string().regex(/^[-_ a-zA-Z0-9]+$/).required(),
  email: Joi.string().email().required(),
  sexe: Joi.string().required(),
  birthday: Joi.date().max('now').required(),
  // Regex Minimum 8 characters, One uppercase and one number
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required()
});

module.exports = createUserSchema;
