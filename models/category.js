const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String
});

CategorySchema.virtual('url').get(function () {
  return `category/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
