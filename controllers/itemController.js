const Item = require('../models/item');

//Display the item details page
exports.item_detail = function (req, res, next) {
  Item.findById(req.params.id)
    .populate('category')
    .exec(function (err, item) {
      if (err) return next(err);

      res.render('item_detail', { item });
    });
};
