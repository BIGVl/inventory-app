const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

//root route
router.get('/', function (req, res, next) {
  res.render('layout');
});

///     CATEGORY ROUTES     ///

//GET the list of categories
router.get('/category', category_controller.category_list);

//GET request for the list of items under a category
router.get('category/:categoryID', category_controller.category_items);

///     ITEM ROUTES     ///

//GET request for one item
router.get('/item/:itemID', item_controller.item_detail);

module.exports = router;
