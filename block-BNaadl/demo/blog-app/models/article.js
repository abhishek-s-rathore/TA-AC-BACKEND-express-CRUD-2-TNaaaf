var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    tags: [String],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
