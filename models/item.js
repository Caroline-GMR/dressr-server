'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  picture: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['top', 'bottom', 'footwear']
  },
  description: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
