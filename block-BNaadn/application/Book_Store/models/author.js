var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, match: /@/ },
    country: { type: String },
    books: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Book' },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Author', authorSchema);
