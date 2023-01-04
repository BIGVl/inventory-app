const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  switches: String,
  wireless: Boolean,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

ItemSchema.virtual('url').get(function () {
  return `/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
