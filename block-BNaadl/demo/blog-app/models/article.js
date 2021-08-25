var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tags: [String],
    author: { type: String, required: true },
    likes: { type: Number },
  },
  { timestamps: true }
);
