"use strict";

var mongoose = require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;
var commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: "Users",
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Comments", commentSchema);