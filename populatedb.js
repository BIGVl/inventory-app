#! /usr/bin/env node

console.log(
  'This script populates some items and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://bigvl:Webdev99@cluster0.71mvewb.mongodb.net/?retryWrites=true&w=majority'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Category = require('./models/category');
var Item = require('./models/item');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = [];
var categories = [];

function itemCreate(name, description, price, stock, switches, wireless, category, cb) {
  var item = new Item({ name, description, price, stock, switches, wireless, category });

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New keyboard: ' + item);
    items.push(item);
    cb(null, item);
  });
}

function categoryCreate(name, description, cb) {
  var category = new Category({ name, description });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function createItems(cb) {
  async.series(
    [
      function (callback) {
        itemCreate(
          'Keychron V1 QMK',
          'One of the best lower budget mechanical keyboards, easily customizable.',
          125,
          25,
          'Brown',
          false,
          categories[2],
          callback
        );
      },
      function (callback) {
        itemCreate('Logitech', 'Arguably the best gaming keyboard.', 250, 13, 'Red', false, categories[3], callback);
      }
    ],
    // optional callback
    cb
  );
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate('100%', 'Keyboards with all the usual keys and maybe even monre', callback);
      },
      function (callback) {
        categoryCreate('TKL', 'Keyboards with all the usual keys except for the numpad', callback);
      },
      function (callback) {
        categoryCreate('75%', 'Keyboards with all the usual keys except numpad plus a few more', callback);
      },
      function (callback) {
        categoryCreate('60%', 'Keyboards without numpad, arrows and a few other keys, most space saving keyboard type', callback);
      }
    ],
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('keyboard :', items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
