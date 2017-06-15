'use strict';

/* Require mongoose to interact with mongoDB */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * Employee schema
 */
var employeeSchema = mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, unique: true, index: true, required: true},
  password: {type: String, required: true},
  phone_number: {type: String, required: true},
  role: {type: String, required: true},
  company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true }
});

module.exports = mongoose.model('employee', employeeSchema);