const Category = require('../models/category');

exports.category_list = function (req, res, next) {
  Category.find({}).exec(function (err, categories) {
    if (err) return next(err);
    console.log(categories);
    res.render('layout', { categories });
  });
};
