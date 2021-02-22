"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    "default": 'No Profile image'
  },
  role: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Users', userSchema);