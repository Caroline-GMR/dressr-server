'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const Item = require('../../models/item.js');
const data = require('../../data/items.js');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to Mongo!');
    return Item.remove({});
  })
  .then(() => {
    console.log('Empty db');
    return Item.insertMany(data);
  })
  .then((results) => {
    console.log('You have some items', results.length);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('There is a problem', error);
  });
