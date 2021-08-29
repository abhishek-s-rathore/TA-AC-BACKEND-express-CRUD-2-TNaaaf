var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    title: { type: String, required: true },
    summery: { type: String, required: true },
    publication: { type: String, required: true },
    pages: { type: Number, required: true },
    isbn: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, match: /@/ },
    country: { type: String },
    catagories: [String],
    cover: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
