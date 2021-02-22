const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const articleSchema = new mongoose.Schema(
  {
    article_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image:{
      type: String,
      default: 'Add article image',
      required: true
  },
    category: {
      type: String,
      required: true,
    },
    comments:[{ 
      type: ObjectId, 
      ref: 'Comments' 
  }],
    share: {
      type: Number,
      default: 43,
    },
    upvote: {
      type: Number,
      default: 0,
    },
    downvote: {
      type: Number,
      default: 0,
    },
    postedBy: {
      type: ObjectId,
      ref: 'Users'  
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Articles", articleSchema);
