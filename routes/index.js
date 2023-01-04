const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

//root route
router.get('/', category_controller.category_list);

///     ITEM ROUTES     ///
//GET request for one item

router.get('/:id', item_controller.item_detail);

module.exports = router;
