const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');
const category = require('../models/category');

//Display list of categories
exports.category_list = function (req, res, next) {
  Category.find({}).exec(function (err, category_list) {
    if (err) return next(err);
    res.render('category_list', { category_list });
  });
};

// Display list of all items under the accessed category
exports.category_items = function (req, res, next) {
  async.series(
    {
      category(callback) {
        Category.findById(req.params.categoryID).exec(callback);
      },
      items(callback) {
        Item.find({ category: req.params.categoryID }).exec(callback);
      }
    },
    function (err, results) {
      if (err) return next(err);

      if (results.category == null) {
        //No results
        const error = new Error('category not found');
        err.status = 404;
        return next(err);
      }

      res.render('category_items', { title: results.category.name, items: results.items });
    }
  );
};
