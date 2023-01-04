const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String
});

CategorySchema.virtual('url').get(function () {
  return `/${this.name}`;
});

module.exports = mongoose.model('Category', CategorySchema);
